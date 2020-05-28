import React, { ReactNode, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { BaseProps } from '../_utils/props';
import TransferPanel from './transfer-panel';
import Button from '../button/button';
import { ArrowDown } from '../_utils/components';

export type TransferItem = {
  key: string;
  label: string;
  disabled: boolean;
};

export interface TransferProps
  extends BaseProps,
    Omit<React.PropsWithRef<JSX.IntrinsicElements['div']>, 'onChange'> {
  dataSource?: TransferItem[];
  value?: string[];
  defaultValue?: string[];
  disabled?: boolean;
  titles?: [ReactNode, ReactNode];
  buttonTexts?: [ReactNode, ReactNode];
  onChange?: (targetKeys: string[], direction: string, moveKeys: string[]) => void;
  leftDefaultChecked?: string[];
  rightDefaultChecked?: string[];
}

const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  (props: TransferProps, ref): React.ReactElement => {
    const {
      dataSource = [],
      defaultValue = [],
      buttonTexts = [],
      titles = [],
      leftDefaultChecked = [],
      rightDefaultChecked = [],
      disabled = false,
      className,
      onChange,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('transfer', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className);

    const getDataKeys = () => {
      const rightKeys: string[] = 'value' in props ? (props.value as string[]) : defaultValue;
      const rightData = dataSource.filter((item) => rightKeys.includes(item.key));
      const leftData = dataSource.filter((item) => !rightKeys.includes(item.key));
      return [leftData, rightData];
    };
    const [leftData, rightData] = getDataKeys();
    const [sourceData] = useState(leftData);
    const [targetData] = useState(rightData);
    const [leftCheckedKeys, setLeftCheckedKeys] = useState(leftDefaultChecked);
    const [rightCheckedKeys, setRightCheckedKeys] = useState(rightDefaultChecked);

    const addToLeft = () => {};

    const addToRight = () => {};

    useEffect(() => {}, []);

    return (
      <div {...otherProps} className={cls} ref={ref}>
        <TransferPanel
          dataSource={sourceData}
          checkedKeys={leftCheckedKeys}
          disabled={disabled}
          onChange={(keys: string[]) => setLeftCheckedKeys(keys)}
        />
        <div className={`${prefixCls}__buttons`}>
          <Button
            btnType="primary"
            size="sm"
            onClick={addToLeft}
            disabled={leftCheckedKeys.length === 0}>
            <ArrowDown size={12} className={`${prefixCls}__left-arrow`} />
            {buttonTexts && buttonTexts[0] !== undefined && <span>{buttonTexts[0]}</span>}
          </Button>
          <Button
            btnType="primary"
            size="sm"
            onClick={addToRight}
            disabled={rightCheckedKeys.length === 0}>
            {buttonTexts && buttonTexts[1] !== undefined && <span>{buttonTexts[1]}</span>}
            <ArrowDown size={12} className={`${prefixCls}__right-arrow`} />
          </Button>
        </div>
        <TransferPanel
          dataSource={targetData}
          checkedKeys={rightCheckedKeys}
          disabled={disabled}
          onChange={(keys: string[]) => setRightCheckedKeys(keys)}
        />
      </div>
    );
  }
);

Transfer.displayName = 'Transfer';

export default Transfer;
