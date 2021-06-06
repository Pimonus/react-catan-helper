import { Player } from '@redux/types/players';

const disableShortcuts = { type: 'SHORTCUTS::DISABLE' };

const scanExistingGame = { type: 'GAME::SCAN' };

const newGame = { type: 'GAME::NEW' };

const resumeGame = { type: 'GAME::RESUME' };

const saveGame = { type: 'GAME::SAVE' };

const enableThief = { type: 'GAME::THIEF::ENABLE' };

const displayStats = { type: 'GAME::STATS::DISPLAY' };

const startGameWithPlayers = (players: ReadonlyArray<Player>) => ({
  type: 'GAME::START',
  payload: {
    players,
  },
});

export default {
  disableShortcuts,
  displayStats,
  enableThief,
  scanExistingGame,
  newGame,
  resumeGame,
  saveGame,
  startGameWithPlayers,
};
