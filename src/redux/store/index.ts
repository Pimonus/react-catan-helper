import { CatanState } from '@core/types';

export const initialState: CatanState = {
  _createdAt: new Date(),
  _resumedAt: null,
  _endedAt: null,
  availableGame: false,
  barbarians: {
    position: 0,
  },
  dices: {
    flipped: false,
    rolling: false,
    spinning: false,
    values: {
      whiteValue: 'six',
      redValue: 'six',
      specialValue: 'barbarians',
    },
  },
  game: {
    enabledThief: false,
    loading: false,
    paused: true,
    showStats: false,
    started: false,
  },
  gameHistory: {
    enabled: false,
    nextTurnKey: undefined,
    previousTurnKey: undefined,
    visualizedTurnIndex: undefined,
    visualizedTurnState: undefined,
    turnKeys: [],
  },
  listenToShortcuts: false,
  players: [],
};
