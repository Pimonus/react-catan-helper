/* @flow */

import type { Dispatch, ThunkAction } from '../../flow';

export const addNewPlayer = (nickname: string): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'PLAYER::ADD',
    nickname: nickname,
  });
};

export const selectPlayer = (playerUuid: string): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'PLAYER::SELECT',
    playerUuid,
  });
};

export const deselectPlayer = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'PLAYER::DESELECT' });
};

export const addVictoryPoint = (playerUuid: string): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'PLAYER::ADD::POINT',
    playerUuid,
  });
};

export const attributeLongestRoad = (playerUuid: string): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'PLAYER::ATTRIBUTE::ROAD',
    playerUuid,
  });
};

export const attributeStrongestArmy = (playerUuid: string): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'PLAYER::ATTRIBUTE::ARMY',
    playerUuid,
  });
};
