/* @flow */

import { SIX, BARBARIANS } from '../../core';
import type { CatanState } from '../../flow';

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
    history: [],
    rolling: false,
    spinning: false,
    values: {
      whiteValue: SIX,
      redValue: SIX,
      specialValue: BARBARIANS,
    },
  },
  game: {
    current: {
      enabledThief: false,
    },
    loading: false,
    paused: true,
  },
  listenToShortcuts: false,
  players: [],
};
