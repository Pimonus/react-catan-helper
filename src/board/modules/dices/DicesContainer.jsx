/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import Dice from './Dice';
import { rollDices } from '../../../redux/actions/dices';
import type { CatanState, DicesValues, Dispatch } from '../../../flow';

import './DicesContainer.css';

type OwnProps = {
  +pausedGame: boolean,
};

type StateProps = {
  +dicesValues: DicesValues,
  +flipped: boolean,
  +rolling: boolean,
  +spinning: boolean,
};

type DispatchProps = {
  +rollDices: () => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  dicesValues: state.dices.values,
  flipped: state.dices.flipped,
  rolling: state.dices.rolling,
  spinning: state.dices.spinning,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  rollDices: () => dispatch(rollDices()),
});

type Props = OwnProps & StateProps & DispatchProps;

const DicesContainer = (props: Props) => {
  const { flipped, rolling, spinning } = props;
  const { whiteValue, redValue, specialValue } = props.dicesValues;

  return (
    <div
      className={cn('dices-container', {
        hidden: props.pausedGame,
      })}
    >
      <button
        onClick={() => {
          if (!rolling) props.rollDices();
        }}
      >
        Lancer !
      </button>
      <div className="dices">
        <Dice
          flipped={flipped}
          spinning={spinning}
          value={specialValue}
          special
        />
        <Dice flipped={flipped} spinning={spinning} value={redValue} red />
        <Dice flipped={flipped} spinning={spinning} value={whiteValue} />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicesContainer);
