'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseError = exports.BaseError = function (_Error) {
  _inherits(BaseError, _Error);

  _createClass(BaseError, null, [{
    key: 'from',
    value: function from(err) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var code = _ref.code,
          message = _ref.message,
          extra = _ref.extra,
          more = _objectWithoutProperties(_ref, ['code', 'message', 'extra']);

      var error = new this(code || err.code, message || err.message, _extends({}, err.extra || {}, extra || {}, more));
      error.stack = err.stack || error.stack;
      return error;
    }
  }]);

  function BaseError(code) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BaseError);

    if (!message) {
      message = code;
      code = 'Unknown';
    }

    var _this = _possibleConstructorReturn(this, (BaseError.__proto__ || Object.getPrototypeOf(BaseError)).call(this, message));

    _this.name = 'BaseError';
    _this.code = code;
    _this.extra = extra;
    return _this;
  }

  return BaseError;
}(Error);

var FailureError = exports.FailureError = function (_BaseError) {
  _inherits(FailureError, _BaseError);

  function FailureError() {
    var _ref2;

    _classCallCheck(this, FailureError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this2 = _possibleConstructorReturn(this, (_ref2 = FailureError.__proto__ || Object.getPrototypeOf(FailureError)).call.apply(_ref2, [this].concat(args)));

    _this2.name = 'FailureError';
    return _this2;
  }

  return FailureError;
}(BaseError);

var FetchError = exports.FetchError = function (_FailureError) {
  _inherits(FetchError, _FailureError);

  function FetchError() {
    var _ref3;

    _classCallCheck(this, FetchError);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var _this3 = _possibleConstructorReturn(this, (_ref3 = FetchError.__proto__ || Object.getPrototypeOf(FetchError)).call.apply(_ref3, [this].concat(args)));

    _this3.name = 'FetchError';
    return _this3;
  }

  return FetchError;
}(FailureError);

var ValidationError = exports.ValidationError = function (_FailureError2) {
  _inherits(ValidationError, _FailureError2);

  function ValidationError() {
    var _ref4;

    _classCallCheck(this, ValidationError);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var _this4 = _possibleConstructorReturn(this, (_ref4 = ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call.apply(_ref4, [this].concat(args)));

    _this4.name = 'ValidationError';
    return _this4;
  }

  return ValidationError;
}(FailureError);
//# sourceMappingURL=error.js.map