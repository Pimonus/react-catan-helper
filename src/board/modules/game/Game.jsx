/** @flow */

import React from 'react';
import { useSelector } from 'react-redux';
import Tooltip from 'react-tooltip';

import Barbarians from '@modules/game/Barbarians';
import thiefIcon from '@images/brigand.png';

import './Game.css';

const GameMenu = () => {
  // use history value if history mode is enabled
  const enabledThief = useSelector(state => {
    const { enabled: isHistoryEnabled } = state.gameHistory;
    const { visualizedTurnState } = state.gameHistory;

    return isHistoryEnabled && visualizedTurnState
      ? visualizedTurnState.game.enabledThief
      : state.game.enabledThief;
  });

  return (
    <div className="game-container">
      {enabledThief ? (
        <>
          <img className="thief-icon" src={thiefIcon} data-tip="React-tooltip" alt="Bad thief!" />
          <Tooltip className="tooltip" place="left" type="dark" effect="solid">
            Le Voleur est activé (héhé)
          </Tooltip>
        </>
      ) : null}
      <Barbarians />
    </div>
  );
};

export default GameMenu;
