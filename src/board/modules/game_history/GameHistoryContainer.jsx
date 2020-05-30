/* @flow */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'react-tooltip';
import cn from 'classnames';

// actions
import { disableHistoryMode, enableHistoryMode, fetchTurn } from '@actions/gameHistory';
// images
import backwardSign from '@images/backward_sign.png';
import forwardSign from '@images/forward_sign.png';
import enableHistoryIcon from '@images/enable_history_icon.png';
import disableHistoryIcon from '@images/disable_history_icon.png';

import './GameHistoryContainer.css';

const GameHistoryContainer = () => {
  const dispatch = useDispatch();
  const historyModeEnabled = useSelector(state => state.gameHistory.enabled);
  const nextTurnKey = useSelector(state => state.gameHistory.nextTurnKey);
  const previousTurnKey = useSelector(state => state.gameHistory.previousTurnKey);

  return (
    <>
      <div className="game-history-container">
        {historyModeEnabled && (
          <img
            className={cn('backward', { disabled: !previousTurnKey })}
            src={backwardSign}
            onClick={() => {
              if (previousTurnKey) dispatch(fetchTurn(previousTurnKey));
            }}
          />
        )}
        {!historyModeEnabled ? (
          <>
            <img
              className="toggle"
              src={enableHistoryIcon}
              onClick={() => dispatch(enableHistoryMode())}
              // tooltip
              data-tip
              data-for="historyMode"
            />
            <Tooltip id="historyMode" className="tooltip">
              Revoir les tours précédents
            </Tooltip>
          </>
        ) : (
          <>
            <img
              className="toggle"
              src={disableHistoryIcon}
              onClick={() => dispatch(disableHistoryMode())}
              // tooltip
              data-tip
              data-for="historyMode"
            />
            <Tooltip id="historyMode" className="tooltip">
              Revenir à la partie
            </Tooltip>
          </>
        )}
        {historyModeEnabled && (
          <img
            className={cn('forward', { disabled: !nextTurnKey })}
            src={forwardSign}
            onClick={() => dispatch(fetchTurn(nextTurnKey))}
          />
        )}
      </div>
    </>
  );
};

export default GameHistoryContainer;
