"use strict";

/* eslint-env jest */
var $intl = require('./intl');

var $locale = $intl.defineLocale('fr', {
  timeZone: 'Europe/Paris',
  currency: 'EUR'
});
test('$locale.number', function () {
  var input = 123456.789;
  var output = $locale.number(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,789');
});
test('$locale.currency', function () {
  var input = 123456.789;
  var output = $locale.currency(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,79 €');
});
test('$locale.date', function () {
  var input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  var output = $locale.date(input);
  expect(output).toBe('01/02/2000');
});
test('$locale.time', function () {
  var input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  var output = $locale.time(input);
  expect(output).toBe('02:01');
});
//# sourceMappingURL=intl.test.js.map