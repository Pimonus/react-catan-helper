/* @flow */

import { initialState } from '../store';
import {
  attackAdvance,
  computePlayersScores,
  computePlayersState,
  newPlayer,
  BARBARIANS,
  SIX,
} from '../../core';
import type { CatanAction, CatanState, Player } from '../../flow';

export const reducer = (
  state: CatanState = initialState,
  action: CatanAction
) => {
  let newState: CatanState;
  switch (action.type) {
    case 'GAME::LOAD': {
      newState =
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
        enabledThief: true,
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

    case 'DICES::REVEAL':
      newState = {
        ...state,
        dices: {
          ...state.dices,
          flipped: false,
          rolling: false,
        },
      };
      break;

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
      console.warn(
        'Ooops, the reducer is about to return the current state without changes!'
      );
      newState = state;
      break;
  }

  if (
    newState &&
    !action.type.startsWith('@@redux') &&
    action.type !== '@@INIT' &&
    action.type !== 'GAME::RESUME'
  ) {
    console.log(`storing after ${action.type} : `, newState);
    localStorage.setItem('currentGame', JSON.stringify(newState));
  }

  return newState;
};
