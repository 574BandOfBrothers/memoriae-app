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


export const signUpRequest = signUpData => dispatch => {
  dispatch({
    type: 'AUTH/SIGN_UP_REQUEST',
  });

  api.signUp(signUpData)
  .then((signUpResponse) => {
    return dispatch({
      type: 'AUTH/SIGN_UP_COMPLETE',
      data: signUpResponse,
    });
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'AUTH/SIGN_UP_REQUEST_FAIL',
      error: errorResponse,
    });
  });
}
