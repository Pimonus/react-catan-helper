import { Dispatch, Player, ThunkAction } from '@core/types';

export const disableShortcuts = { type: 'SHORTCUTS::DISABLE' };

export const getExistingGame = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'GAME::CHECK' });
    if (localStorage.getItem('currentGame') === null) dispatch({ type: 'GAME::NOT_FOUND' });
    else dispatch({ type: 'GAME::FOUND' });
  };
};

export const newGame = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'GAME::NEW' });
  localStorage.removeItem('gameHistory');
  setTimeout(() => {
    dispatch({ type: 'GAME::INITIALIZED' });
  }, 2000);
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

export const saveGame = { type: 'GAME::SAVE' };

export const enableThief = { type: 'GAME::THIEF::ENABLE' };

export const startGame = (players: ReadonlyArray<Player>) => ({
  type: 'GAME::START',
  payload: {
    players,
  },
});
