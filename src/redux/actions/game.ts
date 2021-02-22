import { Player } from '@core/types';

const disableShortcuts = { type: 'SHORTCUTS::DISABLE' };

const scanExistingGame = { type: 'GAME::SCAN' };

const newGame = { type: 'GAME::NEW' };

const resumeGame = { type: 'GAME::RESUME' };

const saveGame = { type: 'GAME::SAVE' };

const enableThief = { type: 'GAME::THIEF::ENABLE' };

const startGameWithPlayers = (players: ReadonlyArray<Player>) => ({
  type: 'GAME::START',
  payload: {
    players,
  },
});

export default {
  disableShortcuts,
  enableThief,
  scanExistingGame,
  newGame,
  resumeGame,
  saveGame,
  startGameWithPlayers,
};
