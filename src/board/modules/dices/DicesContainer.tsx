import React from 'react';
import { useSelector } from 'react-redux';

import Dice from '@modules/dices/Dice';
import { CatanState } from '@core/types';

import './DicesContainer.css';

const DicesContainer = () => {
  const flipped = useSelector((state: CatanState) => state.dices.flipped);
  const spinning = useSelector((state: CatanState) => state.dices.spinning);

  // use history values if history mode is enabled
  const { whiteValue, redValue, specialValue } = useSelector((state: CatanState) => {
    const { enabled: isHistoryEnabled } = state.gameHistory;
    const { visualizedTurnState } = state.gameHistory;

    return isHistoryEnabled && visualizedTurnState
      ? visualizedTurnState.dices.values
      : state.dices.values;
  });

  return (
    <div className="dices-container">
      <Dice flipped={flipped} spinning={spinning} value={specialValue} special />
      <Dice flipped={flipped} spinning={spinning} value={redValue} red />
      <Dice flipped={flipped} spinning={spinning} value={whiteValue} />
    </div>
  );
};

export default DicesContainer;
