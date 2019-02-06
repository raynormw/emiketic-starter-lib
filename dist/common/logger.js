"use strict";

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

var _debug = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
function enable(namespace) {
  _debug.default.enable(namespace);
}

function disable() {
  _debug.default.disable();
}

var PREFIX = '';

function createLogger() {
  var ns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$ignorePrefix = _ref.ignorePrefix,
      ignorePrefix = _ref$ignorePrefix === void 0 ? false : _ref$ignorePrefix;

  var namespace = (!ignorePrefix && PREFIX ? PREFIX : '') + (!ignorePrefix && ns ? ':' : '') + ns;

  var _debugLogger = (0, _debug.default)(namespace);

  _debugLogger.log = console.log.bind("".concat(namespace));

  var _infoLogger = (0, _debug.default)("".concat(namespace));

  _infoLogger.log = console.info.bind(console);

  var _warnLogger = (0, _debug.default)("".concat(namespace));

  _warnLogger.log = console.warn.bind(console);

  var _errorLogger = (0, _debug.default)("".concat(namespace));

  _errorLogger.log = console.error.bind(console);
  return {
    namespace: namespace,
    _debugLogger: _debugLogger,
    debug: function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _debugLogger.apply(void 0, ['DEBUG'].concat(args));
    },
    _infoLogger: _infoLogger,
    info: function info() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _infoLogger.apply(void 0, ['INFO'].concat(args));
    },
    _warnLogger: _warnLogger,
    warn: function warn() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _warnLogger.apply(void 0, ['WARN'].concat(args));
    },
    _errorLogger: _errorLogger,
    error: function error() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      _errorLogger.apply(void 0, ['ERROR'].concat(args));
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