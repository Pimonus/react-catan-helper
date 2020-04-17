/* @flow */

import { initialState } from '../store';
import {
  computePlayersScores,
  computePlayersState,
  newPlayer,
} from '../../core';
import type { CatanAction, CatanState, Player } from '../../flow';

const softActions = [
  '@@INIT',
  'GAME::CHECK',
  'GAME::FOUND',
  'GAME::NOT_FOUND',
  'GAME::RESUME',
  'SHORTCUTS::DISABLE',
  'SWAL::FIRE',
  'SWAL::DISMISS',
];

const enablingShortcutsActions = [
  'BARBARIANS::ATTACK',
  'BARBARIANS::PROGRESS',
  'DICES::REVEAL',
  'GAME::LOAD',
  'GAME::CREATED',
  'GAME::THIEF::ENABLE',
  'PLAYER::ADD',
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
              selectedPlayerUuid: undefined,
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

    case 'BARBARIANS::ATTACK':
      newState = {
        ...state,
        barbarians: {
          position: 0,
        },
      };
      break;

    case 'BARBARIANS::PROGRESS':
      newState = {
        ...state,
        barbarians: {
          position: state.barbarians.position + 1,
        },
      };
      break;

    case 'DICES::DEFINE::VALUES': {
      newState = {
        ...state,
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
      newState = {
        ...state,
        dices: {
          ...state.dices,
          flipped: false,
          rolling: false,
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

    case 'PLAYER::ADD::COLONY': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newColony: action.playerUuid,
        }),
      };
      break;
    }

    case 'PLAYER::ADD::CITY': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newCity: action.playerUuid,
        }),
      };
      break;
    }

    case 'PLAYER::DESTROY::CITY': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          destroyCity: action.playerUuid,
        }),
      };
      break;
    }

    case 'PLAYER::ADD::POINT': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newVictoryPoint: action.playerUuid,
        }),
      };
      break;
    }

    case 'PLAYER::REMOVE::POINT': {
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          removeVictoryPoint: action.playerUuid,
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

    case 'PLAYER::SAVE::NICKNAME': {
      const { playerUuid: uuid, nickname } = action;
      newState = {
        ...state,
        players: computePlayersState(state.players, {
          newNickname: { uuid, nickname },
        }),
      };
      break;
    }

    case 'PLAYER::DELETE': {
      const { playerUuid } = action;
      const newPlayers: $ReadOnlyArray<Player> = state.players.filter(
        player => player.uuid !== playerUuid
      );
      newState = {
        ...state,
        players: newPlayers,
        selectedPlayerUuid: undefined,
      };
      break;
    }

    default:
      if (
        !action.type.startsWith('@@redux') &&
        !softActions.find(type => type === action.type)
      )
        console.warn(
          `Ooops, the reducer is about to return the current state without changes! The action is ${action.type}`
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
