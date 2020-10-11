/** @flow */

import type { Dispatch, ThunkAction } from '@flow';

export const enableHistoryMode = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'GAME::HISTORY::ENABLE' });

export const disableHistoryMode = (): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'GAME::HISTORY::DISABLE' });

export const fetchTurn = (turnKey?: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'GAME::HISTORY::TURN::FETCH', turnKey });
  const history = JSON.parse(localStorage.getItem('gameHistory') || '');
  if (!history || !history[turnKey]) {
    dispatch({ type: 'GAME::HISTORY::TURN::FETCH!!ERROR' });
  } else {
    dispatch({
      type: 'GAME::HISTORY::TURN::VISUALIZE',
      turn: JSON.parse(history[turnKey] || ''),
      turnKey,
    });
  }
};
