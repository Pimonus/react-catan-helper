/* @flow */

import type { Dispatch, ThunkAction } from '../../flow';

export const moveBarbariansForward = (): ThunkAction => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'BARBARIANS::PROGRESS' });
  };
};
