'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.defineLocale = defineLocale;
var TIME_ZONE = exports.TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

function defineLocale(locale) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  defaults = _extends({
    timeZone: TIME_ZONE,
    currency: 'USD'
  }, defaults);

  var $locale = {
    $t: function $t(text) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      args.forEach(function (arg) {
        return text = text.replace('%{}', arg);
      });
      return text;
    },
    number: function number(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return value.toLocaleString(locale, options);
    },


    // currency(value, currency = defaults.currency, options = {}) {
    //   return `${value.toLocaleString(locale, options)} ${currency}`;
    // },

    currency: function currency(value) {
      var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.currency;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return value.toLocaleString(locale, _extends({
        style: 'currency',
        currency: currency
      }, options));
    },
    date: function date(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return value.toLocaleDateString(locale, _extends({}, options, {
        timeZone: options.timeZone || defaults.timeZone
      }));
    },
    time: function time(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        hour: 'numeric',
        minute: 'numeric'
      };

      return value.toLocaleTimeString(locale, _extends({}, options, {
        timeZone: options.timeZone || defaults.timeZone
      }));
    }
  };

  Object.assign($locale, {
    timestamp: function timestamp(value) {
      return $locale.date(value) + ' ' + $locale.time(value);
    }
  });

  return $locale;
}

var $locale = exports.$locale = defineLocale('en');
//# sourceMappingURL=intl.js.map