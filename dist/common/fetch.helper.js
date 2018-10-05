'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.encode = encode;
exports.toQueryString = toQueryString;
exports.toFormData = toFormData;
exports.Request = Request;
exports.ResponseHandler = ResponseHandler;
exports.ErrorValueHandler = ErrorValueHandler;
exports.ErrorHandler = ErrorHandler;

var _events = require('./events');

var _error3 = require('./error');

var _logger = require('./logger');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Logger = (0, _logger.createLogger)('FetchHelper');

/**
 * Query String and Form Data
 */

function encode(result, name, value) {
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'querystring';

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value) {
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
      value.forEach(function (val, index) {
        return encode(result, name + '[' + index + ']', val, mode);
      });
    } else {
      Object.keys(value).forEach(function (key) {
        return encode(result, name + '[' + encodeURIComponent(key) + ']', value[key], mode);
      });
    }
  } else {
    result[name] = encodeURIComponent(String(value));
  }
}

function toQueryString(data) {
  var result = {};
  Object.keys(data).forEach(function (key) {
    return encode(result, encodeURIComponent(key), data[key], 'querystring');
  });
  var outcome = Object.keys(result).map(function (key) {
    return key + '=' + result[key];
  }).join('&');
  return outcome;
}

function toFormData(data) {
  var result = {};
  Object.keys(data).forEach(function (key) {
    return encode(result, encodeURIComponent(key), data[key], 'formdata');
  });
  var outcome = new FormData();
  Object.keys(result).forEach(function (key) {
    return outcome.append(key, result[key]);
  });
  return outcome;
}

function Request(method, url) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var route = options.route,
      query = options.query,
      headers = options.headers,
      body = options.body,
      more = _objectWithoutProperties(options, ['route', 'query', 'headers', 'body']);

  route = route || {};
  query = query || {};
  headers = headers || {};

  Object.entries(route).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        param = _ref2[0],
        value = _ref2[1];

    url = url.replace(new RegExp(':' + param), encodeURIComponent(value));
  });

  var queryString = toQueryString(query);

  url += queryString ? '?' + queryString : '';

  headers.Accept = 'application/json';

  if (body && (typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
    if (toString.call(body) === '[object Object]' || toString.call(body) === '[object Array]') {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }
    // if (body instanceof FormData) {
    //   headers['Content-Type'] = 'multipart/form-data';
    // }

    // if (body instanceof URLSearchParams) {
    //   headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    // }
  }

  var request = new self.Request(url, _extends({
    method: method,
    headers: headers,
    body: body
  }, more));

  return request;
}

/**
 * Response Listeners
 */

var events = exports.events = new _events.EventEmitter();

/**
 * Response Handler
 * Converts JSON to Object and throws error for non-success statuses
 */

function ResponseHandler(response) {
  var successModifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (payload, response) {
    return payload;
  };
  var failureModifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (error, response) {
    return error;
  };

  var content = void 0;

  var contentType = response.headers.get('Content-Type', '');

  if (contentType === null) {
    content = Promise.resolve(null);
  } else if (contentType.startsWith('application/json')) {
    content = response.json();
  } else {
    content = response.text().then(function (text) {
      return { text: text };
    });
  }

  return content.then(function (payload) {
    payload = payload || {};

    var error = null;

    if (payload.error && _typeof(payload.error) === 'object') {
      error = payload.error;
    }

    if (error || !response.ok) {
      error = error || payload;

      var _error2 = error,
          code = _error2.code,
          message = _error2.message,
          extra = _objectWithoutProperties(_error2, ['code', 'message']);

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

      error = _error3.FetchError.from(error, _extends({ code: code, message: message }, extra));

      error = failureModifier(error, response);

      throw error;
    }

    payload = successModifier(payload, response);

    events.emit('success', payload, response);

    return payload;
  }).catch(function (error) {
    events.emit('failure', error, response);

    throw _error3.FetchError.from(error);
  });
}

function ErrorValueHandler(_error) {
  var failureModifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (error, response) {
    return error;
  };

  var code = _error.code;
  var message = _error.message || _error.error;

  code = code || 'Unknown';
  message = message || 'Unknown error';

  var error = _error3.FetchError.from(_error, { code: code, message: message });

  var response = {};

  error = failureModifier(error, response);

  events.emit('failure', error, response);

  return error;
}

function ErrorHandler(_error, failureModifier) {
  return Promise.reject(ErrorValueHandler(_error, failureModifier));
}

if (process.env.NODE_ENV === 'development') {
  global.FetchHelper = module.exports;

  events.on('success', function (payload, response) {
    Logger.debug('@success', response.url, response.status, payload);
  });

  events.on('failure', function (error, response) {
    Logger.debug('@failure', response.url, response.status, error.code, error, error.extra);
  });
}
//# sourceMappingURL=fetch.helper.js.map