import React, { useContext, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { AnchorLinkProps, AnchorProps } from './types';
import { AnchorContext } from './anchor-context';
import Sticky from '../sticky';

const Anchor = (props: AnchorProps): JSX.Element => {
  const {
    offsetTop = 0,
    offsetBottom,
    className,
    style,
    children,
    prefixCls: customisedCls,
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('anchor', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const [activeId, setActiveId] = useState('');

  const scrollToAnchor = (anchor: string): void => {
    if (!window.document.body.querySelector(`#${anchor}`)) {
      const element = window.document.body.querySelector(`[name=user-content-${anchor}]`);
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  /**
   * If the url contains the hash, check whether there is an element can be scrolled into
   */
  const hashScroll = useCallback(() => {
    const { location } = window;
    if (location.search) {
      const urlParams = new URLSearchParams(location.search);
      const anchor = urlParams.get('anchor');
      !!anchor && scrollToAnchor(anchor);
    } else if (location.hash) {
      const anchor = location.hash.replace('#', '');
      !!anchor && scrollToAnchor(anchor);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const headings = document.querySelectorAll('*[id]');
    if (headings.length === 0) return;

    let newActive = headings[0].id;
    const top = document.documentElement.scrollTop;
    headings.forEach((h) => {
      const el = document.querySelector(`#${h.id}`);
      if (!el) return;
      if ((el as HTMLElement).offsetTop <= top) {
        newActive = h.id;
      }
    });
    setActiveId(newActive);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorName: string) => {
    const { location } = window;
    // if it is a HashRouter mode, prevent the default event nad update the query.
    if (location.pathname === location.hash.replace('#', '').replace(/\?.*/, '')) {
      e.preventDefault();
      const url =
        location.protocol + '//' + location.host + location.pathname + `?anchor=${anchorName}`;
      window.history.pushState({ path: url }, '', url);
    }
    scrollToAnchor(anchorName);
  };

  useEffect(() => {
    hashScroll();

    document.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [hashScroll, handleScroll]);

  return (
    <Sticky offsetTop={offsetTop} offsetBottom={offsetBottom}>
      <AnchorContext.Provider value={{ activeId, onClick: handleLinkClick }}>
        <ul className={cls} style={style}>
          {React.Children.map(children, (child) => {
            const childElement = child as React.FunctionComponentElement<AnchorLinkProps>;
            if (childElement.type.displayName === 'AnchorLink') {
              const childProps: Partial<AnchorLinkProps> = {
                prefixCls,
              };
              return React.cloneElement(childElement, childProps);
            }
            return null;
          })}
        </ul>
      </AnchorContext.Provider>
    </Sticky>
  );
};

Anchor.displayName = 'Anchor';

export default Anchor;
