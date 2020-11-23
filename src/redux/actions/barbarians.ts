import { Dispatch, ThunkAction } from '@core/types';

export const moveBarbariansForward = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'BARBARIANS::PROGRESS' });
  };
};
