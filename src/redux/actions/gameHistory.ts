export const enableHistoryMode = { type: 'GAME::HISTORY::ENABLE' };
export const disableHistoryMode = { type: 'GAME::HISTORY::DISABLE' };
export const fetchTurn = (turnKey?: string) => ({ type: 'GAME::HISTORY::TURN::FETCH', turnKey });
