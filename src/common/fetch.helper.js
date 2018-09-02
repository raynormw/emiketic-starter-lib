import { EventEmitter } from './events';

import { FetchError } from './error';

import { createLogger } from './logger';

const Logger = createLogger('FetchHelper');

/**
 * Query String and Form Data
 */

export function encode(result, name, value, mode = 'querystring') {
  if (typeof value === 'object' && value) {
    if (value instanceof File) {
      if (mode === 'formdata') {
        result[name] = value;
      } else if (mode === 'querystring') {
        // result[name] = new FileReader().readAsDataURL(value);
      }
    } else if (value instanceof Date) {
      result[name] = value.toJSON();
    } else if (typeof value.toJSON === 'function') {
      encode(result, name, JSON.parse(value.toJSON()), mode);
    } else if (Array.isArray(value)) {
      value.forEach((val, index) => encode(result, `${name}[${index}]`, val, mode));
    } else {
      Object.keys(value).forEach((key) => encode(result, `${name}[${encodeURIComponent(key)}]`, value[key], mode));
    }
  } else {
    result[name] = encodeURIComponent(String(value));
  }
}

export function toQueryString(data) {
  const result = {};
  Object.keys(data).forEach((key) => encode(result, encodeURIComponent(key), data[key], 'querystring'));
  const outcome = Object.keys(result)
    .map((key) => `${key}=${result[key]}`)
    .join('&');
  return outcome;
}

export function toFormData(data) {
  const result = {};
  Object.keys(data).forEach((key) => encode(result, encodeURIComponent(key), data[key], 'formdata'));
  const outcome = new FormData();
  Object.keys(result).forEach((key) => outcome.append(key, result[key]));
  return outcome;
}

export function Request(method, url, options = {}) {
  let {
    route, query, headers, body, ...more
  } = options;

  route = route || {};
  query = query || {};
  headers = headers || {};

  Object.entries(route).forEach(([param, value]) => {
    url = url.replace(new RegExp(`:${param}`), encodeURIComponent(value));
  });

  const queryString = toQueryString(query);

  url += queryString ? `?${queryString}` : '';

  headers.Accept = 'application/json';

  if (body && typeof body === 'object') {
    if (body instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }
  }

  const request = new global.Request(url, {
    method,
    headers,
    body,
    ...more,
  });

  return request;
}

/**
 * Response Listeners
 */

export const events = new EventEmitter();

/**
 * Response Handler
 * Converts JSON to Object and throws error for non-success statuses
 */

export function ResponseHandler(
  response,
  successModifier = (payload, response) => payload,
  failureModifier = (error, response) => error,
) {
  let content;

  const contentType = response.headers.get('Content-Type', '');

  if (contentType === null) {
    content = Promise.resolve(null);
  } else if (contentType.startsWith('application/json')) {
    content = response.json();
  } else {
    content = response.text().then((text) => ({ text }));
  }

  return content
    .then((payload) => {
      payload = payload || {};

      let error = null;

      if (payload.error && typeof payload.error === 'object') {
        error = payload.error;
      }

      if (error || !response.ok) {
        error = error || payload;

        let { code, message, ...extra } = error;

        if (typeof payload.error === 'string') {
          message = message || payload.error;
        }

        if (response.status === 400) {
          code = code || 'Invalid';
          message = message || 'Invalid request';
        } else if (response.status === 401) {
          code = code || 'Unauthenticated';
          message = message || 'Unauthenticated';
        } else if (response.status === 403) {
          code = code || 'Unauthorized';
          message = message || 'Unauthorized';
        } else if (response.status === 404) {
          code = code || 'NotFound';
          message = message || 'Not found';
        } else if (response.status >= 500) {
          code = code || 'Server';
          message = message || 'Server error';
        } else {
          code = code || 'Unknown';
          message = message || 'Unknown error';
        }

        error = FetchError.from(error, { code, message, ...extra });

        error = failureModifier(error, response);

        throw error;
      }

      payload = successModifier(payload, response);

      events.emit('success', payload, response);

      return payload;
    })
    .catch((error) => {
      events.emit('failure', error, response);

      throw FetchError.from(error);
    });
}

export function ErrorValueHandler(_error, failureModifier = (error, response) => error) {
  let code = _error.code;
  let message = _error.message || _error.error;

  code = code || 'Unknown';
  message = message || 'Unknown error';

  let error = FetchError.from(_error, { code, message });

  const response = {};

  error = failureModifier(error, response);

  events.emit('failure', error, response);

  return error;
}

export function ErrorHandler(_error, failureModifier) {
  return Promise.reject(ErrorValueHandler(_error, failureModifier));
}

if (process.env.NODE_ENV === 'development') {
  global.FetchHelper = module.exports;

  events.on('success', (payload, response) => {
    Logger.debug('@success', response.url, response.status, payload);
  });

  events.on('failure', (error, response) => {
    Logger.debug('@failure', response.url, response.status, error.code, error, error.extra);
  });
}
