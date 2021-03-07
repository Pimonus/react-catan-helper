export const selectPlayer = (playerUuid: string) => ({
  type: 'PLAYER::SELECT',
  payload: {
    playerUuid,
  },
});

export const deselectPlayer = { type: 'PLAYER::DESELECT' };

export const addColony = (playerUuid: string) => ({
  type: 'PLAYER::ADD::COLONY',
  payload: {
    playerUuid,
  },
});

export const addCity = (playerUuid: string) => ({
  type: 'PLAYER::ADD::CITY',
  payload: {
    playerUuid,
  },
});

export const destroyCity = (playerUuid: string) => ({
  type: 'PLAYER::DESTROY::CITY',
  payload: {
    playerUuid,
  },
});

export const destroyColony = (playerUuid: string) => ({
  type: 'PLAYER::DESTROY::COLONY',
  payload: {
    playerUuid,
  },
});

export const addVictoryPoint = (playerUuid: string) => ({
  type: 'PLAYER::ADD::POINT',
  payload: {
    playerUuid,
  },
});

export const removeVictoryPoint = (playerUuid: string) => ({
  type: 'PLAYER::REMOVE::POINT',
  payload: {
    playerUuid,
  },
});

export const attributeLongestRoad = (playerUuid: string) => ({
  type: 'PLAYER::ATTRIBUTE::ROAD',
  payload: {
    playerUuid,
  },
});

export const attributeStrongestArmy = (playerUuid: string) => ({
  type: 'PLAYER::ATTRIBUTE::ARMY',
  payload: {
    playerUuid,
  },
});

export const savePlayerNickname = (playerUuid: string, nickname: string) => ({
  type: 'PLAYER::SAVE::NICKNAME',
  payload: {
    playerUuid,
    nickname,
  },
});

export const deletePlayer = (playerUuid: string) => ({
  type: 'PLAYER::DELETE',
  payload: {
    playerUuid,
  },
});
