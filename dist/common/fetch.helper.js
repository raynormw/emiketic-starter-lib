"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.toQueryString = toQueryString;
exports.toFormData = toFormData;
exports.Request = Request;
exports.ResponseHandler = ResponseHandler;
exports.ErrorValueHandler = ErrorValueHandler;
exports.ErrorHandler = ErrorHandler;
exports.events = void 0;

var _events = require("./events");

var _error3 = require("./error");

var _logger = require("./logger");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Logger = (0, _logger.createLogger)('FetchHelper');
/**
 * Query String and Form Data
 */

function encode(result, name, value) {
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'querystring';

  if (_typeof(value) === 'object' && value) {
    if (value instanceof File) {
      if (mode === 'formdata') {
        result[name] = value;
      } else if (mode === 'querystring') {// result[name] = new FileReader().readAsDataURL(value);
      }
    } else if (value instanceof Date) {
      result[name] = value.toJSON();
    } else if (typeof value.toJSON === 'function') {
      encode(result, name, JSON.parse(value.toJSON()), mode);
    } else if (Array.isArray(value)) {
      value.forEach(function (val, index) {
        return encode(result, "".concat(name, "[").concat(index, "]"), val, mode);
      });
    } else {
      Object.keys(value).forEach(function (key) {
        return encode(result, "".concat(name, "[").concat(encodeURIComponent(key), "]"), value[key], mode);
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
    return "".concat(key, "=").concat(result[key]);
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
      more = _objectWithoutProperties(options, ["route", "query", "headers", "body"]);

  route = route || {};
  query = query || {};
  headers = headers || {};
  Object.entries(route).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        param = _ref2[0],
        value = _ref2[1];

    url = url.replace(new RegExp(":".concat(param)), encodeURIComponent(value));
  });
  var queryString = toQueryString(query);
  url += queryString ? "?".concat(queryString) : '';
  headers.Accept = 'application/json';

  if (body && _typeof(body) === 'object') {
    if (toString.call(body) === '[object Object]' || toString.call(body) === '[object Array]') {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    } // if (body instanceof FormData) {
    //   headers['Content-Type'] = 'multipart/form-data';
    // }
    // if (body instanceof URLSearchParams) {
    //   headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    // }

  }

  var request = new global.Request(url, _objectSpread({
    method: method,
    headers: headers,
    body: body
  }, more));
  return request;
}
/**
 * Response Listeners
 */


var events = new _events.EventEmitter();
/**
 * Response Handler
 * Converts JSON to Object and throws error for non-success statuses
 */

exports.events = events;

function ResponseHandler(response) {
  var successModifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (payload, response) {
    return payload;
  };
  var failureModifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (error, response) {
    return error;
  };
  var content;
  var contentType = response.headers.get('Content-Type', '');

  if (contentType === null) {
    content = Promise.resolve(null);
  } else if (contentType.startsWith('application/json')) {
    content = response.json();
  } else {
    content = response.text().then(function (text) {
      return {
        text: text
      };
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
          extra = _objectWithoutProperties(_error2, ["code", "message"]);

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

      error = _error3.FetchError.from(error, _objectSpread({
        code: code,
        message: message
      }, extra));
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

  var error = _error3.FetchError.from(_error, {
    code: code,
    message: message
  });

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