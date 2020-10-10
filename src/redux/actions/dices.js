/** @flow */

import { getClassicDiceValue, getSpecialDiceValue } from '@core';
import type { Dispatch, ThunkAction } from '@flow';

export const rollDices = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'DICES::FLIP' });

    dispatch({
      type: 'DICES::DEFINE::VALUES',
      values: {
        whiteValue: getClassicDiceValue(),
        redValue: getClassicDiceValue(),
        specialValue: getSpecialDiceValue(),
      },
    });

    setTimeout(() => {
      dispatch({ type: 'DICES::SPIN' });
    }, 400);

    setTimeout(() => {
      dispatch({ type: 'DICES::STOP' });
    }, 1700);

    setTimeout(() => {
      dispatch({ type: 'DICES::REVEAL' });
    }, 2500);
  };
};
