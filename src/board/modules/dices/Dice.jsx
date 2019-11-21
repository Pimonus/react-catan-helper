/* @flow */

import React from 'react';
import cn from 'classnames';

import type { ClassicDiceValue, SpecialDiceValue } from '../../../flow';

import './Dice.css';

type Props = {
  +flipped: boolean,
  +spinning: boolean,
  +red?: boolean,
  +special?: boolean,
  +value: ClassicDiceValue | SpecialDiceValue,
};

const Dice = (props: Props) => {
  const { spinning, flipped } = props;
  return (
    <div
      className={cn('dice', {
        spinning,
        flipped,
      })}
    >
      <div className="inner">
        <div
          className={`front ${props.red ? 'red' : ''} ${
            props.special ? 'special' : ''
          } ${props.value}`}
        ></div>
        <div className="back"></div>
      </div>
    </div>
  );
};
export default Dice;
