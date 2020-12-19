import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import cn from 'classnames';

// actions
import { disableHistoryMode, enableHistoryMode, fetchTurn } from '@actions/gameHistory';
// types
import { CatanState } from '@core/types';
// images
import backwardSign from '@images/backward_sign.png';
import forwardSign from '@images/forward_sign.png';
import enableHistoryIcon from '@images/enable_history_icon.png';
import disableHistoryIcon from '@images/disable_history_icon.png';

import './GameHistoryContainer.css';

const GameHistoryContainer = () => {
  const dispatch = useDispatch();

  const historyModeEnabled = useSelector((state: CatanState) => state.gameHistory.enabled);
  const nextTurnKey = useSelector((state: CatanState) => state.gameHistory.nextTurnKey);
  const previousTurnKey = useSelector((state: CatanState) => state.gameHistory.previousTurnKey);
  const visualizedTurnIndex = useSelector(
    (state: CatanState) => state.gameHistory.visualizedTurnIndex
  );

  const renderTurn = (): string => {
    if (!nextTurnKey) return 'Dernier tour';
    if (visualizedTurnIndex !== undefined) return `Tour ${visualizedTurnIndex + 1}`;
    return '';
  };

  return (
    <>
      <div className="game-history-container">
        <p className={cn('turn', { visible: historyModeEnabled })}>{renderTurn()}</p>
        <img
          alt="previous turn"
          className={cn('backward', { disabled: !previousTurnKey, visible: historyModeEnabled })}
          src={backwardSign}
          onClick={() => {
            if (previousTurnKey) dispatch(fetchTurn(previousTurnKey));
          }}
        />
        {!historyModeEnabled ? (
          <Tooltip placement="top" className="tooltip" title="Revoir les tours précédents">
            <img
              alt="enable history mode"
              className="toggle"
              src={enableHistoryIcon}
              onClick={() => dispatch(enableHistoryMode())}
            />
          </Tooltip>
        ) : (
          <Tooltip placement="top" className="tooltip" title="Revenir à la partie">
            <img
              alt="disable history mode"
              className="toggle"
              src={disableHistoryIcon}
              onClick={() => dispatch(disableHistoryMode())}
            />
          </Tooltip>
        )}
        <img
          alt="next turn"
          className={cn('forward', { disabled: !nextTurnKey, visible: historyModeEnabled })}
          src={forwardSign}
          onClick={() => dispatch(fetchTurn(nextTurnKey))}
        />
      </div>
    </>
  );
};

export default GameHistoryContainer;
