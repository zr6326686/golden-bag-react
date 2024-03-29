import fetch from 'dva/fetch';
import {message} from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status === 401) {
    window.location = '/auth/login?callback=' + window.location;
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  response.json().then(resJson => {
    message.error(resJson.message);
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  options.credentials = 'include';
  options.headers = {
    ...options.credentials.headers,
    'Content-Type': 'application/json;charset=UTF-8'
  };
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}));
}
