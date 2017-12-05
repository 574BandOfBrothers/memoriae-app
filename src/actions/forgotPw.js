import api from '../configs/api';

export const forgotpWRequest = () => dispatch => {
  dispatch({
    type: 'PASSWORD_SENT',
  });
}
