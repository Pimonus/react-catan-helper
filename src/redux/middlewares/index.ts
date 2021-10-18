import { Middleware } from 'redux';

import { CatanState as State, MiddlewareAction } from '@core/types';
import { getClassicDiceValue, getSpecialDiceValue } from '@core/index';

export const middleware: Middleware<
  {}, // legacy type parameter added to satisfy interface signature
  State
> = () => (next) => (action: MiddlewareAction) => {
  next(action);
  switch (action.type) {
    case 'GAME::SCAN': {
      const currentGame = localStorage.getItem('currentGame');
      if (currentGame === null) next({ type: 'GAME::NOT_FOUND' });
      else next({ type: 'GAME::FOUND', payload: { currentGame } });
      return;
    }

    case 'GAME::NEW': {
      localStorage.removeItem('gameHistory');
      setTimeout(() => {
        next({ type: 'GAME::INITIALIZED' });
      }, 2000);
      return;
    }

    case 'GAME::RESUME': {
      try {
        const state = JSON.parse(localStorage.getItem('currentGame') || '');
        // simulate a 2sec loading, in reality it is instantaneous
        setTimeout(() => {
          next({ type: 'GAME::LOAD', state });
        }, 2000);
      } catch (error) {
        next({ type: 'GAME::LOAD!!ERROR', error });
      }
      return;
    }

    case 'DICES::ROLL': {
      next({
        type: 'DICES::DEFINE::VALUES',
        payload: {
          values: {
            whiteValue: getClassicDiceValue(),
            redValue: getClassicDiceValue(),
            specialValue: getSpecialDiceValue(),
          },
        },
      });
      setTimeout(() => {
        next({ type: 'DICES::SPIN' });
      }, 400);

      setTimeout(() => {
        next({ type: 'DICES::STOP' });
      }, 1700);

      setTimeout(() => {
        next({ type: 'DICES::REVEAL' });
      }, 2500);
      break;
    }

    case 'GAME::HISTORY::TURN::FETCH': {
      const { turnKey } = action;
      const history = JSON.parse(localStorage.getItem('gameHistory') || '');
      if (!history || (turnKey && !history[turnKey])) {
        next({ type: 'GAME::HISTORY::TURN::FETCH!!ERROR' });
      } else if (turnKey) {
        next({
          type: 'GAME::HISTORY::TURN::VISUALIZE',
          turn: JSON.parse(history[turnKey] || ''),
          turnKey,
        });
      }
      break;
    }

    default:
      return;
  }

  return;
};
