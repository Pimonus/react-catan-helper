/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import Dice from './Dice';
import type { CatanState, DicesValues } from '../../../flow';

import './DicesContainer.css';

type StateProps = {
  +dicesValues: DicesValues,
  +flipped: boolean,
  +rolling: boolean,
  +spinning: boolean,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  dicesValues: state.dices.values,
  flipped: state.dices.flipped,
  rolling: state.dices.rolling,
  spinning: state.dices.spinning,
});

type Props = StateProps;

const DicesContainer = (props: Props) => {
  const { flipped, spinning } = props;
  const { whiteValue, redValue, specialValue } = props.dicesValues;

  return (
    <div className="dices-container">
      <div className="top-dices">
        <Dice
          flipped={flipped}
          spinning={spinning}
          value={specialValue}
          special
        />
      </div>
      <div className="bottom-dices">
        <Dice flipped={flipped} spinning={spinning} value={redValue} red />
        <Dice flipped={flipped} spinning={spinning} value={whiteValue} />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(DicesContainer);
