/* eslint-env jest */

const { defineLocale, default: $intl } = require('./intl');

$intl.current = $intl.fr = defineLocale('fr', {
  timeZone: 'Europe/Paris',
  currency: 'EUR',
});

test('$intl.current.number', () => {
  const input = 123456.789;
  const output = $intl.current.number(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,789');
});

test('$intl.current.currency', () => {
  const input = 123456.789;
  const output = $intl.current.currency(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,79 €');
});

test('$intl.current.date', () => {
  const input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  const output = $intl.current.date(input);
  expect(output).toBe('01/02/2000');
});

test('$intl.current.time', () => {
  const input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  const output = $intl.current.time(input);
  expect(output).toBe('02:01');
});
