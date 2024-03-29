import randomstring from 'randomstring';

import playerReducer from '@reducers/player';
import { initialState } from '@store/index';
import {
  computePlayersScores,
  getStateForHistory,
  getStateForStorage,
  ATTACK_POSITION,
} from '@core/index';
import { CatanAction, CatanState } from '@core/types';
import { Player } from '@redux/types/players';

const middlewareActions = ['GAME::SCAN', 'GAME::NEW'];

const softActions = [
  '@@INIT',
  'GAME::SCAN',
  'GAME::FOUND',
  'GAME::NOT_FOUND',
  'GAME::RESUME',
  'GAME::SAVE',
  'GAME::HISTORY::ENABLE',
  'GAME::HISTORY::DISABLE',
  'GAME::HISTORY::TURN::VISUALIZE',
  'GAME::STATS::SHOW',
  'GAME::STATS::CLOSE',
  'SHORTCUTS::DISABLE',
  'SWAL::FIRE',
  'SWAL::DISMISS',
];

const enablingShortcutsActions = [
  'BARBARIANS::PROGRESS',
  'DICES::REVEAL',
  'GAME::LOAD',
  'GAME::HISTORY::DISABLE',
  'GAME::SAVE',
  'GAME::START',
  'GAME::STATS::CLOSE',
  'GAME::THIEF::ENABLE',
  'PLAYER::DESELECT',
  'SWAL::DISMISS',
];

export const reducer = (state: CatanState = initialState, action: CatanAction): CatanState => {
  let newState: CatanState;
  switch (action.type) {
    case 'GAME::FOUND': {
      newState = { ...state, availableGame: true };
      break;
    }

    case 'GAME::LOAD': {
      newState = {
        ...action.state,
        _resumedAt: new Date(),
        game: {
          ...action.state.game,
          loading: false,
          paused: false,
        },
        gameHistory: {
          enabled: false,
          turnKeys: action.state.gameHistory.turnKeys,
        },
        selectedPlayerUuid: undefined,
      };
      break;
    }

    case 'GAME::NEW':
      newState = {
        ...initialState,
        game: {
          ...state.game,
          loading: true,
          paused: false,
        },
      };
      break;

    case 'GAME::START':
      newState = {
        ...initialState,
        game: {
          ...state.game,
          started: true,
        },
        players: computePlayersScores(action.payload.players),
      };
      break;

    case 'GAME::INITIALIZED':
      newState = {
        ...initialState,
        game: {
          ...state.game,
          loading: false,
          paused: false,
        },
      };
      break;

    case 'GAME::RESUME':
      newState = {
        ...state,
        game: { ...state.game, loading: true, paused: false },
      };
      break;

    case 'GAME::HISTORY::ENABLE': {
      const { turnKeys } = state.gameHistory;
      newState = {
        ...state,
        gameHistory: {
          ...state.gameHistory,
          enabled: true,
          nextTurnKey: undefined,
          previousTurnKey: turnKeys.length > 1 ? turnKeys[turnKeys.length - 2] : undefined,
          visualizedTurnIndex: turnKeys.length - 1,
        },
      };
      break;
    }

    case 'GAME::HISTORY::DISABLE':
      newState = {
        ...state,
        gameHistory: {
          ...state.gameHistory,
          enabled: false,
          nextTurnKey: undefined,
          previousTurnKey: undefined,
          visualizedTurnIndex: undefined,
          visualizedTurnState: undefined,
        },
      };
      break;

    case 'GAME::HISTORY::TURN::VISUALIZE': {
      const { turnKey } = action;
      const { turnKeys } = state.gameHistory;
      const visualizedTurnIndex = turnKeys.indexOf(turnKey);

      let nextTurnKey, previousTurnKey;
      if (!turnKey) {
        nextTurnKey = undefined;
        previousTurnKey = turnKeys[turnKeys.length - 1];
      } else if (visualizedTurnIndex === 0) {
        nextTurnKey = turnKeys.length > 1 ? turnKeys[1] : undefined;
        previousTurnKey = undefined;
      } else {
        nextTurnKey = turnKeys[visualizedTurnIndex + 1];
        previousTurnKey = turnKeys[visualizedTurnIndex - 1];
      }
      newState = {
        ...state,
        gameHistory: {
          ...state.gameHistory,
          nextTurnKey,
          previousTurnKey,
          visualizedTurnIndex,
          visualizedTurnState: action.turn,
        },
      };
      break;
    }

    case 'GAME::THIEF::ENABLE':
      newState = {
        ...state,
        game: { ...state.game, enabledThief: true },
      };
      break;

    case 'GAME::STATS::SHOW':
      newState = {
        ...state,
        game: { ...state.game, showStats: true },
      };
      break;

    case 'GAME::STATS::CLOSE':
      newState = {
        ...state,
        game: { ...state.game, showStats: false },
      };
      break;

    case 'BARBARIANS::PROGRESS': {
      const currentPosition = state.barbarians.position;
      newState = {
        ...state,
        barbarians: {
          position: currentPosition === ATTACK_POSITION ? 1 : state.barbarians.position + 1,
        },
      };
      break;
    }

    case 'DICES::DEFINE::VALUES': {
      newState = {
        ...state,
        dices: {
          ...state.dices,
          values: action.payload.values,
        },
      };
      break;
    }

    case 'DICES::ROLL':
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

    case 'PLAYER::SELECT':
      newState = {
        ...state,
        selectedPlayerUuid: action.payload.playerUuid,
      };
      break;

    case 'PLAYER::DESELECT':
      newState = {
        ...state,
        selectedPlayerUuid: undefined,
      };
      break;

    case 'PLAYER::ADD::COLONY':
    case 'PLAYER::DESTROY::COLONY':
    case 'PLAYER::ADD::CITY':
    case 'PLAYER::DESTROY::CITY':
    case 'PLAYER::ADD::POINT':
    case 'PLAYER::REMOVE::POINT':
    case 'PLAYER::ATTRIBUTE::ROAD':
    case 'PLAYER::ATTRIBUTE::ARMY':
    case 'PLAYER::SAVE::NICKNAME': {
      newState = {
        ...state,
        players: playerReducer(state.players, action),
      };
      break;
    }

    case 'PLAYER::DELETE': {
      const { playerUuid } = action.payload;
      const newPlayers: ReadonlyArray<Player> = state.players.filter(
        (player) => player.uuid !== playerUuid
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
        !softActions.find((type) => type === action.type) &&
        process.env.NODE_ENV === 'development'
      ) {
        console.warn(
          `Ooops, the reducer is about to return the current state without changes! The action is ${action.type}`
        );
      }
      newState = state;
      break;
  }

  if (action.type === 'GAME::SAVE') {
    const history = JSON.parse(localStorage.getItem('gameHistory') || '{}');
    const newTurnKey = randomstring.generate({
      length: 6,
      charset: 'hex',
    });
    history[newTurnKey] = getStateForHistory(state);
    localStorage.setItem('gameHistory', JSON.stringify(history));
    newState = {
      ...state,
      gameHistory: {
        ...state.gameHistory,
        turnKeys: [...state.gameHistory.turnKeys, newTurnKey],
        visualizedTurnIndex: undefined,
      },
    };
  }

  if (
    newState &&
    !action.type.startsWith('@@redux') &&
    ![...softActions, ...middlewareActions].includes(action.type)
  ) {
    localStorage.setItem('currentGame', getStateForStorage(newState));
  }

  return {
    ...newState,
    listenToShortcuts: enablingShortcutsActions.includes(action.type),
  };
};
