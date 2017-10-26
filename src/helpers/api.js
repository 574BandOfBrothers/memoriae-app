import api from '../configs/api';

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    response.json().then(jsonBody => {
      if (response.ok) {
        return resolve(jsonBody);
      }

      return reject({
        status: response.status,
        headers: response.headers,
        body: jsonBody,
      });
    })
    .catch(() => (response.ok ? resolve(response) : reject(response)));
  });
}

function handleError(error) {
  if (error && error.message && error.message.toLowerCase().indexOf('network') >= 0) {
    return Promise.reject({
      body: {
        error: {
          message: 'networkError',
        }
      }
    });
  }

  return Promise.reject(error);
}


export default class Api {
  constructor(url, token = null, refreshToken = null) {
    this._token = token;
    this._url = url;
  }

  get token() {
    return this._token;
  }

  set token(newToken) {
    this._token = newToken;
  }

  header(customHeader) {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (this._token) {
      headers['Authorization'] = `Bearer ${this._token}`;
    }

    if (customHeader) {
      headers = {
        ...headers,
        ...customHeader
      };
    }

    return headers;
  }

  signIn() {
    // TODO: actual fetch request to the api
    return Promise.resolve({
      accessToken: '123',
      name: 'Arda',
    })
  }
}
