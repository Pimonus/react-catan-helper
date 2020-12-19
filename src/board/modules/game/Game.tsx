import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';

import Barbarians from '@modules/game/Barbarians';
import { CatanState } from '@core/types';
import thiefIcon from '@images/brigand.png';

import './Game.css';

const GameMenu = () => {
  // use history value if history mode is enabled
  const enabledThief = useSelector((state: CatanState) => {
    const { enabled: isHistoryEnabled } = state.gameHistory;
    const { visualizedTurnState } = state.gameHistory;

    return isHistoryEnabled && visualizedTurnState
      ? visualizedTurnState.game.enabledThief
      : state.game.enabledThief;
  });

  return (
    <div className="game-container">
      {enabledThief && (
        <Tooltip placement="left" title="Le voleur est activé (héhé)">
          <img className="thief-icon" src={thiefIcon} alt="Bad thief!" />
        </Tooltip>
      )}
      <Barbarians />
    </div>
  );
};

export default GameMenu;
