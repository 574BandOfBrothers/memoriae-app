import { AsyncStorage } from 'react-native';
import api from '../configs/api';

import { STORE_SESSION_TOKEN_KEY } from '../helpers/constants';

const saveAuthDataToStore = (tokens) => {
  return AsyncStorage.setItem(STORE_SESSION_TOKEN_KEY, JSON.stringify(tokens))
  .catch(error => console.log('saveAuthDataToStore:', error));
}

clearAuthDataFromStore = () => {
  return AsyncStorage.removeItem(STORE_SESSION_TOKEN_KEY)
  .catch(error => console.log('clearAuthDataFromStore:', error));
}

export const signInRequest = signInData => dispatch => {
  dispatch({
    type: 'AUTH/SIGN_IN_REQUEST'
  });

  api.signIn(signInData)
  .then((signInResponse) => {
    const authData = {
      ...signInResponse,
      email: signInData.email,
    }

    saveAuthDataToStore(authData);

    return dispatch({
      type: 'AUTH/SIGN_IN_COMPLETE',
      data: authData,
    });
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'AUTH/SIGN_IN_REQUEST_FAIL',
      error: errorResponse,
    });
  });
}

export const signUpRequest = signUpData => dispatch => {
  dispatch({
    type: 'AUTH/SIGN_UP_REQUEST',
  });

  api.signUp(signUpData)
  .then(() => {
    signInRequest(signUpData,true)(dispatch);
  })
  .catch(errorResponse => {
    return dispatch({
      type: 'AUTH/SIGN_UP_REQUEST_FAIL',
      error: errorResponse,
    });
  });
}

export const signOutRequest = () => dispatch => {
  clearAuthDataFromStore()
  .then(() => {
    dispatch({
      type: 'AUTH/SIGN_OUT_COMPLETE',
    });
  })
  .catch((error) => {
    console.log(error);
    dispatch({
      type: 'AUTH/SIGN_OUT_REQUEST_FAIL',
      error: error,
    });
  });
}
