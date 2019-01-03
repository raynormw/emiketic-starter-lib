/* eslint-env jest */

const $intl = require('./intl');

const $locale = $intl.defineLocale('fr', {
  timeZone: 'Europe/Paris',
  currency: 'EUR',
});

test('$locale.number', () => {
  const input = 123456.789;
  const output = $locale.number(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,789');
});

test('$locale.currency', () => {
  const input = 123456.789;
  const output = $locale.currency(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,79 €');
});

test('$locale.date', () => {
  const input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  const output = $locale.date(input);
  expect(output).toBe('01/02/2000');
});

test('$locale.time', () => {
  const input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  const output = $locale.time(input);
  expect(output).toBe('02:01');
});
