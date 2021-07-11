import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import cn from 'classnames';

// actions
import { disableHistoryMode, fetchTurn } from '@actions/gameHistory';
// types
import { CatanState } from '@core/types';
// images
import backwardSign from '@images/backward_sign.png';
import forwardSign from '@images/forward_sign.png';
import disableHistoryIcon from '@images/disable_history_icon.png';

import './GameHistoryContainer.less';

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
        {historyModeEnabled && (
          <>
            <img
              alt="disable history mode"
              className="toggle"
              data-for="history-tooltip"
              data-tip="Revenir à la partie"
              src={disableHistoryIcon}
              onClick={() => dispatch(disableHistoryMode)}
            />
            <ReactTooltip id="history-tooltip" className="tooltip" place="top" effect="solid" />
          </>
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
