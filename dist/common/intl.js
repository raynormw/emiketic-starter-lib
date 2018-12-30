'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.defineLocale = defineLocale;
function defineLocale(locale) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    currency: '?'
  };

  function $t(text) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    args.forEach(function (arg) {
      return text = text.replace('%{}', arg);
    });
    return text;
  }

  $t.number = function (value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return value.toLocaleString(locale, options);
  };

  // $t.currency = (value, currency = defaults.currency, options = {}) => `${value.toLocaleString(locale, options)} ${currency}`;

  $t.currency = function (value) {
    var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.currency;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return value.toLocaleString(locale, _extends({
      style: 'currency',
      currency: currency
    }, options));
  };

  $t.date = function (value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return value.toLocaleDateString(locale, options);
  };

  $t.time = function (value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      hour: 'numeric',
      minute: 'numeric'
    };
    return value.toLocaleTimeString(locale, options);
  };

  $t.timestamp = function (value) {
    return $t.date(value) + ' at ' + $t.time(value);
  };

  return $t;
}

var $t = exports.$t = defineLocale('en', {
  currency: 'USD'
});
//# sourceMappingURL=intl.js.map