import { Dispatch, ThunkAction } from '@core/types';

export const fireSwal = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'SWAL::FIRE' });
};

export const dismissSwal = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'SWAL::DISMISS' });
};
