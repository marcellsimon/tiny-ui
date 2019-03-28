import * as React from 'react';
import classnames from 'classnames';

export type XProps = {
    prefixCls?: string,
    className?: string,
    style?: React.CSSProperties,
} & typeof defaultProps;

const defaultProps = {};

const X = (props: XProps) => {
    const { prefixCls, className, style } = props;
    const cls = classnames(prefixCls, className);
    
    return (
        <div className={cls} style={style}>

        </div>
    );
};

X.defaultProps = defaultProps;

export default X;
