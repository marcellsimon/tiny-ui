import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { BaseProps, SizeType, DirectionType } from '../_utils/props';

export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';
export type SpaceSize = SizeType | number;

export interface SpaceProps extends BaseProps, React.PropsWithRef<JSX.IntrinsicElements['div']> {
  align?: SpaceAlign;
  direction?: DirectionType;
  size?: SpaceSize;
}

const spaceSize = {
  sm: 8,
  md: 16,
  lg: 24,
};

const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  (props: SpaceProps, ref): JSX.Element => {
    const {
      direction = 'horizontal',
      size = 'sm',
      align = 'center',
      className,
      children,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('space', configContext.prefixCls, customisedCls);
    const cls = classNames(
      prefixCls,
      className,
      `${prefixCls}_${direction}`,
      `${prefixCls}_${align}`
    );

    const getItemStyle = (idx: number): React.CSSProperties => {
      if (React.Children.count(children) - 1 !== idx) {
        return {
          [direction === 'vertical' ? 'marginBottom' : 'marginRight']:
            typeof props.size === 'number' ? size : spaceSize[size as SizeType],
        };
      }
      return {};
    };

    return (
      <div {...otherProps} ref={ref} className={cls}>
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className={`${prefixCls}__item`} style={getItemStyle(idx)}>
            {child}
          </div>
        ))}
      </div>
    );
  }
);

Space.displayName = 'Space';

export default Space;
