'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enable = enable;
exports.disable = disable;
exports.createLogger = createLogger;
exports.setup = setup;
exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint-disable no-underscore-dangle */

function enable(namespace) {
  _debug2.default.enable(namespace);
}

function disable() {
  _debug2.default.disable();
}

var PREFIX = '';

function createLogger() {
  var ns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ignorePrefix = _ref.ignorePrefix,
      ignorePrefix = _ref$ignorePrefix === undefined ? false : _ref$ignorePrefix;

  var namespace = (!ignorePrefix && PREFIX ? PREFIX : '') + (!ignorePrefix && ns ? ':' : '') + ns;

  var _debugLogger = (0, _debug2.default)(namespace);
  _debugLogger.log = console.log.bind('' + namespace);

  var _infoLogger = (0, _debug2.default)('' + namespace);
  _infoLogger.log = console.info.bind(console);

  var _warnLogger = (0, _debug2.default)('' + namespace);
  _warnLogger.log = console.warn.bind(console);

  var _errorLogger = (0, _debug2.default)('' + namespace);
  _errorLogger.log = console.error.bind(console);

  return {
    namespace: namespace,
    _debugLogger: _debugLogger,
    debug: function debug() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _debugLogger.apply(undefined, ['DEBUG'].concat(_toConsumableArray(args)));
    },

    _infoLogger: _infoLogger,
    info: function info() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _infoLogger.apply(undefined, ['INFO'].concat(_toConsumableArray(args)));
    },

    _warnLogger: _warnLogger,
    warn: function warn() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _warnLogger.apply(undefined, ['WARN'].concat(_toConsumableArray(args)));
    },

    _errorLogger: _errorLogger,
    error: function error() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      _errorLogger.apply(undefined, ['ERROR'].concat(_toConsumableArray(args)));
    }
  };
}

var LOGGER = null;

function setup(namespace) {
  PREFIX = namespace;
  LOGGER = createLogger();
}

function debug() {
  if (LOGGER) {
    var _LOGGER;

    (_LOGGER = LOGGER).debug.apply(_LOGGER, arguments);
  }
}

function info() {
  if (LOGGER) {
    var _LOGGER2;

    (_LOGGER2 = LOGGER).info.apply(_LOGGER2, arguments);
  }
}

function warn() {
  if (LOGGER) {
    var _LOGGER3;

    (_LOGGER3 = LOGGER).warn.apply(_LOGGER3, arguments);
  }
}

function error() {
  if (LOGGER) {
    var _LOGGER4;

    (_LOGGER4 = LOGGER).error.apply(_LOGGER4, arguments);
  }
}
//# sourceMappingURL=logger.js.map