/** @flow */

import React from 'react';
import { useSelector } from 'react-redux';

import Dice from '@modules/dices/Dice.jsx';

import './DicesContainer.css';

const DicesContainer = () => {
  const flipped = useSelector(state => state.dices.flipped);
  const spinning = useSelector(state => state.dices.spinning);

  // use history values if history mode is enabled
  const { whiteValue, redValue, specialValue } = useSelector(state => {
    const { enabled: isHistoryEnabled } = state.gameHistory;
    const { visualizedTurnState } = state.gameHistory;

    return isHistoryEnabled && visualizedTurnState
      ? visualizedTurnState.dices.values
      : state.dices.values;
  });

  return (
    <div className="dices-container">
      <div className="top-dices">
        <Dice flipped={flipped} spinning={spinning} value={specialValue} special />
      </div>
      <div className="bottom-dices">
        <Dice flipped={flipped} spinning={spinning} value={redValue} red />
        <Dice flipped={flipped} spinning={spinning} value={whiteValue} />
      </div>
    </div>
  );
};

export default DicesContainer;
