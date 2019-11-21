/* @flow */

import type { Dispatch, ThunkAction, Player } from '../../flow';

export const pauseGame = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'GAME::PAUSE' });
  };
};

export const resumeGame = (): ThunkAction => (dispatch: Dispatch) => {
  try {
    dispatch({ type: 'GAME::RESUME' });
    const state = JSON.parse(localStorage.getItem('currentGame') || '');
    // simulate a 2sec loading, in reality it is instantaneous
    setTimeout(() => {
      dispatch({ type: 'GAME::LOAD', state });
    }, 2000);
  } catch (error) {
    dispatch({ type: 'GAME::LOAD!!ERROR', error });
  }
};

export const enableThief = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'GAME::THIEF::ENABLE' });
  };
};
