"use strict";

/* eslint-env jest */
var _require = require('./intl'),
    defineLocale = _require.defineLocale,
    $intl = _require.default;

$intl.current = $intl.fr = defineLocale('fr', {
  timeZone: 'Europe/Paris',
  currency: 'EUR'
});
test('$intl.current.number', function () {
  var input = 123456.789;
  var output = $intl.current.number(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,789');
});
test('$intl.current.currency', function () {
  var input = 123456.789;
  var output = $intl.current.currency(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,79 €');
});
test('$intl.current.date', function () {
  var input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  var output = $intl.current.date(input);
  expect(output).toBe('01/02/2000');
});
test('$intl.current.time', function () {
  var input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  var output = $intl.current.time(input);
  expect(output).toBe('02:01');
});
//# sourceMappingURL=intl.test.js.map