/* @flow */

import { initialState } from '../store';
import {
  attackAdvance,
  computePlayersScores,
  computePlayersState,
  getDicesScore,
  newPlayer,
  BARBARIANS,
} from '../../core';
import type { CatanAction, CatanState } from '../../flow';

const softActions = [
  '@@INIT',
  'GAME::CHECK',
  'GAME::FOUND',
  'GAME::NOT_FOUND',
  'GAME::RESUME',
  'SWAL::FIRE',
  'SWAL::DISMISS',
];

const enablingShortcutsActions = [
  'DICES::REVEAL',
  'GAME::LOAD',
  'GAME::CREATED',
  'GAME::THIEF::ENABLE',
  'PLAYER::DESELECT',
  'SWAL::DISMISS',
];

export const reducer = (
  state: CatanState = initialState,
  action: CatanAction
) => {
  let newState: CatanState;
  switch (action.type) {
    case 'GAME::FOUND': {
      newState = { ...state, availableGame: true };
      break;
    }

    case 'GAME::LOAD': {
      newState =
        // FIXME action.state === null is not possible
        action.state === null || action.state === undefined
          ? initialState
          : {
              ...action.state,
              _resumedAt: new Date(),
              game: {
                ...action.state.game,
                loading: false,
                paused: false,
              },
            };
      break;
    }

    case 'GAME::NEW':
      newState = {
        ...initialState,
        game: { ...state.game, loading: true, paused: false },
      };
      break;

    case 'GAME::CREATED':
      newState = {
        ...initialState,
        game: { ...state.game, loading: false, paused: false },
      };
      break;

    case 'GAME::PAUSE':
      newState = {
        ...state,
        game: { ...state.game, paused: true },
      };
      break;

    case 'GAME::RESUME':
      newState = {
        ...state,
        game: { ...state.game, loading: true, paused: false },
      };
      break;

    case 'GAME::THIEF::ENABLE':
      newState = {
        ...state,
        game: { ...state.game, enabledThief: true },
      };
      break;

    case 'DICES::DEFINE::VALUES': {
      const barbariansPosition =
        state.barbarians.position +
        (action.values.specialValue === BARBARIANS ? 1 : 0);
      newState = {
        ...state,
        barbarians: {
          ...state.barbarians,
          position:
            barbariansPosition === attackAdvance
              ? barbariansPosition
              : barbariansPosition % attackAdvance,
        },
        dices: {
          ...state.dices,
          history: [...state.dices.history, action.values],
          values: action.values,
        },
      };
      break;
    }

    case 'DICES::FLIP':
      newState = {
        ...state,
        dices: {
          ...state.dices,
          flipped: true,
          rolling: true,
        },
      };
      break;

    case 'DICES::REVEAL': {
      const dicesScore = getDicesScore(state.dices.values);
      newState = {
        ...state,
        dices: {
          ...state.dices,
          flipped: false,
          rolling: false,
        },
        game: {
          ...state.game,
          enabledThief: state.game.enabledThief || dicesScore === 7,
        },
      };
      break;
    }

    case 'DICES::SPIN':
      newState = {
        ...state,
        dices: {
          ...state.dices,
          spinning: true,
        },
      };
      break;

    case 'DICES::STOP':
      newState = {
        ...state,
        dices: {
          ...state.dices,
          spinning: false,
        },
      };
      break;

    case 'PLAYER::ADD':
      const newPlayers = [...state.players, newPlayer(action.nickname)];
      newState = {
        ...state,
        players: computePlayersScores(newPlayers),
      };
      break;

    case 'PLAYER::SELECT':
      newState = {
        ...state,
        selectedPlayerUuid: action.playerUuid,
      };
      break;

    case 'PLAYER::DESELECT':
      newState = {
        ...state,
        selectedPlayerUuid: undefined,
      };
      break;

    case 'PLAYER::ADD::POINT': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newVictoryPoint: action.playerUuid,
        }),
      };
      break;
    }

    case 'PLAYER::ATTRIBUTE::ROAD': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newRoadHolder: action.playerUuid,
        }),
      };
      break;
    }

    case 'PLAYER::ATTRIBUTE::ARMY': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newArmyHolder: action.playerUuid,
        }),
      };
      break;
    }

    default:
      if (
        !action.type.startsWith('@@redux') &&
        !softActions.find(type => type === action.type)
      )
        console.warn(
          'Ooops, the reducer is about to return the current state without changes!'
        );
      newState = state;
      break;
  }

  if (
    newState &&
    !action.type.startsWith('@@redux') &&
    !softActions.includes(action.type)
  ) {
    localStorage.setItem('currentGame', JSON.stringify(newState));
  }

  return {
    ...newState,
    listenToShortcuts: enablingShortcutsActions.includes(action.type),
  };
};
