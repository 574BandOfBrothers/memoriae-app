import { Map, fromJS } from 'immutable';

const initialState = Map({
  accessToken: null,
  name: null,
});

export default (state = initialState, { type, data }) => {
  switch (type) {
    case 'AUTH/SIGN_IN_COMPLETE':
      return state
        .set('accessToken', data.token);

    case 'AUTH/SIGN_OUT_COMPLETE':
      return state
        .set('accessToken', null);

    case 'AUTH/SIGN_UP_COMPLETE':

    case 'AUTH/REFRESH_TOKEN_REQUEST_FAIL':
      return initialState;

    default:
      return state
  }
}
