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

  signIn(data) {
    return fetch(`${this._url}/authenticate`, {
      method: 'post',
      headers: this.header(),
      body: JSON.stringify(data),
    })
    .then(handleResponse)
    .then((response) => {
      this._token = response.accessToken;
      return Promise.resolve(response);
    })
    .catch(handleError);
  }

  signUp(data) {
    return fetch(`${this._url}/users`, {
      method: 'post',
      headers: this.header(),
      body: JSON.stringify(data),
    }).then(handleResponse, handleError);
  }

  getStories() {
    return fetch(`${this._url}/stories`, {
      method: 'get',
      headers: this.header(),
    }).then(handleResponse, handleError);
  }

  requestSignedUrl() {
    return fetch(`${this._url}/uploads/request`, {
      method: 'get',
      headers: this.header(),
    }).then(handleResponse, handleError);
  }

  uploadToSignedUrl(url, file, fileType = 'image/jpg') {
    // INFO: XHR request is used for Amazon Upload due to the fetch mime type bug
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.timeout = 60000;

      xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
          return xhr.status === 200 ? resolve() : reject(xhr);
        }
      }

      xhr.ontimeout = reject;

      xhr.open('PUT', url);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.send({ uri: file, type: fileType });
    })
  }

  createStory(story) {
    return fetch(`${this._url}/stories`, {
      method: 'post',
      mode: 'cors',
      headers: this.header(),
      body: JSON.stringify(story),
    }).then(handleResponse, handleError);
  }

  searchStories(query) {
    return fetch(`${this._url}/search?query=${query}`, {
      method: 'get',
      headers: this.header(),
    }).then(handleResponse, handleError);
  }
}
