import { Dispatch, ThunkAction } from '@core/types';

export const selectPlayer = (playerUuid: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER::SELECT',
    playerUuid,
  });
};

export const deselectPlayer = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'PLAYER::DESELECT' });
};

export const addColony = (playerUuid: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER::ADD::COLONY',
    playerUuid,
  });
};

export const addCity = (playerUuid: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER::ADD::CITY',
    playerUuid,
  });
};

export const destroyCity = (playerUuid: string): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'PLAYER::DESTROY::CITY', playerUuid });

export const destroyColony = (playerUuid: string): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'PLAYER::DESTROY::COLONY', playerUuid });

export const addVictoryPoint = (playerUuid: string): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'PLAYER::ADD::POINT', playerUuid });

export const removeVictoryPoint = (playerUuid: string): ThunkAction => (dispatch: Dispatch) =>
  dispatch({ type: 'PLAYER::REMOVE::POINT', playerUuid });

export const attributeLongestRoad = (playerUuid: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER::ATTRIBUTE::ROAD',
    playerUuid,
  });
};

export const attributeStrongestArmy = (playerUuid: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER::ATTRIBUTE::ARMY',
    playerUuid,
  });
};

export const savePlayerNickname = (playerUuid: string, nickname: string): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'PLAYER::SAVE::NICKNAME',
    playerUuid,
    nickname,
  });
};

export const deletePlayer = (playerUuid: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'PLAYER::DELETE',
    playerUuid,
  });
};
