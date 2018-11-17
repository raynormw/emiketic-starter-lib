'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$t = $t;
function $t(text) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (arg) {
    text = text.replace('%{}', arg);
  });
  return text;
}

$t.number = function (value) {
  return value.toFixed();
};

$t.currency = function (value) {
  return value.toFixed() + ' $';
};

$t.date = function (value) {
  return JSON.stringify(value).substr(0, 10);
};

$t.time = function (value) {
  return JSON.stringify(value).substr(11, 5);
};

$t.timestamp = function (value) {
  return $t.date(value) + ' ' + $t.time(value);
};
//# sourceMappingURL=intl.js.map