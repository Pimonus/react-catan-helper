import { getClassicDiceValue, getSpecialDiceValue } from '@core/index';
import { Dispatch, ThunkAction } from '@core/types';

export const rollDices = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'DICES::FLIP' });

    dispatch({
      type: 'DICES::DEFINE::VALUES',
      payload: {
        values: {
          whiteValue: getClassicDiceValue(),
          redValue: getClassicDiceValue(),
          specialValue: getSpecialDiceValue(),
        },
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
