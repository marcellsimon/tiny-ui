import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { BaseProps } from '../_utils/props';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';

export interface TextareaProps extends BaseProps {
  rows?: number;
  limit?: number;
  counter?: (count?: number) => React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const Textarea = (props: TextareaProps): React.ReactElement => {
  const {
    disabled = false,
    prefixCls: customisedCls,
    limit,
    counter,
    defaultValue,
    value,
    rows,
    onChange,
    className,
    style,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('textarea', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_disabled`]: disabled,
  });
  const [count, setCount] = useState(0);

  const textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length);
    onChange && onChange(e.currentTarget.value, e);
  };

  if (limit || counter) {
    return (
      <span className={`${prefixCls}-container`}>
        <textarea
          {...otherProps}
          maxLength={limit}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          className={cls}
          style={style}
          onChange={textareaOnChange}
        />
        <span className={`${prefixCls}__counter`}>
          {counter && typeof counter === 'function' ? counter(count) : `${count}/${limit}`}
        </span>
      </span>
    );
  } else {
    return (
      <textarea
        {...props}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        className={cls}
        style={style}
        onChange={textareaOnChange}
      />
    );
  }
};

export default Textarea;
