import React from 'react';
import cn from 'classnames';

import { ClassicDiceValue, SpecialDiceValue } from '@core/types';

import './Dice.css';

interface Props {
  flipped: boolean;
  spinning: boolean;
  red?: boolean;
  special?: boolean;
  value: ClassicDiceValue | SpecialDiceValue;
}

const Dice = (props: Props) => {
  const { flipped, red, special, spinning, value } = props;

  return (
    <div className={cn('dice', { spinning, flipped })}>
      <div className="inner">
        <div className={cn('front', value, { red, special })} />
        <div className="back" />
      </div>
    </div>
  );
};
export default Dice;
