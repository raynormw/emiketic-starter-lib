"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.FetchError = exports.FailureError = exports.BaseError = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BaseError =
/*#__PURE__*/
function (_Error) {
  _inherits(BaseError, _Error);

  _createClass(BaseError, null, [{
    key: "from",
    value: function from(err) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          code = _ref.code,
          message = _ref.message,
          extra = _ref.extra,
          more = _objectWithoutProperties(_ref, ["code", "message", "extra"]);

      var error = new this(code || err.code, message || err.message, _objectSpread({}, err.extra || {}, extra || {}, more));
      error.stack = err.stack || error.stack;
      return error;
    }
  }]);

  function BaseError(code) {
    var _this;

    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BaseError);

    if (!message) {
      message = code;
      code = 'Unknown';
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseError).call(this, message));
    _this.name = 'BaseError';
    _this.code = code;
    _this.extra = extra;
    return _this;
  }

  return BaseError;
}(_wrapNativeSuper(Error));

exports.BaseError = BaseError;

var FailureError =
/*#__PURE__*/
function (_BaseError) {
  _inherits(FailureError, _BaseError);

  function FailureError() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, FailureError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FailureError)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this2.name = 'FailureError';
    return _this2;
  }

  return FailureError;
}(BaseError);

exports.FailureError = FailureError;

var FetchError =
/*#__PURE__*/
function (_FailureError) {
  _inherits(FetchError, _FailureError);

  function FetchError() {
    var _getPrototypeOf3;

    var _this3;

    _classCallCheck(this, FetchError);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(FetchError)).call.apply(_getPrototypeOf3, [this].concat(args)));
    _this3.name = 'FetchError';
    return _this3;
  }

  return FetchError;
}(FailureError);

exports.FetchError = FetchError;

var ValidationError =
/*#__PURE__*/
function (_FailureError2) {
  _inherits(ValidationError, _FailureError2);

  function ValidationError() {
    var _getPrototypeOf4;

    var _this4;

    _classCallCheck(this, ValidationError);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(ValidationError)).call.apply(_getPrototypeOf4, [this].concat(args)));
    _this4.name = 'ValidationError';
    return _this4;
  }

  return ValidationError;
}(FailureError);

exports.ValidationError = ValidationError;
//# sourceMappingURL=error.js.map