import api from '../configs/api';

export const signInRequest = signInData => dispatch => {
  dispatch({
    type: 'AUTH/SIGN_IN_REQUEST'
  });

  api.signIn()
  .then((signInResponse) => {
    return dispatch({
      type: 'AUTH/SIGN_IN_COMPLETE',
      data: signInResponse,
    });
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'AUTH/SIGN_IN_REQUEST_FAIL',
      error: errorResponse,
    });
  });
}


export const signOutRequest = () => dispatch => {
  dispatch({
    type: 'AUTH/SIGN_OUT_COMPLETE',
  });
}
