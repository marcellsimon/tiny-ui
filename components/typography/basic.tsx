import React, { useContext } from 'react';
import classNames from 'classnames';
import { BaseProps } from '../_utils/props';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';

export interface TypographyProps extends BaseProps {
  children?: React.ReactNode;
}

const generator = (type: string, defaultPrefixCls: string) => {
  const Component = (props: TypographyProps): React.ReactElement => {
    const { prefixCls: customisedCls, className, style, children } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls(defaultPrefixCls, configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className);

    return React.createElement(
      type,
      {
        style,
        className: cls,
      },
      children
    );
  };

  Component.defaultProps = {
    prefixCls: defaultPrefixCls,
  };

  return Component;
};

const H1 = generator('h1', 'h1');
const H2 = generator('h2', 'h2');
const H3 = generator('h3', 'h3');
const H4 = generator('h4', 'h4');
const H5 = generator('h5', 'h5');
const H6 = generator('h6', 'h6');
const P = generator('p', 'p');

const Typography = { H1, H2, H3, H4, H5, H6, P };

export default Typography;
