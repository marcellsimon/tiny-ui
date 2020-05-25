import Flip, { FlipProps } from './flip';
import FlipItem, { FlipItemProps } from './flip-item';

export { FlipProps, FlipItemProps };

type IFlip = typeof Flip & {
  Item: typeof FlipItem;
};

const DefaultFlip = Flip as IFlip;
DefaultFlip.Item = FlipItem;

export default DefaultFlip;
