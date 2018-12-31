/* eslint-env jest */

const { defineLocale } = require('./intl');

const $t = defineLocale('fr', {
  timeZone: 'Europe/Paris',
  currency: 'EUR',
});

test('$t.number', () => {
  const input = 123456.789;
  const output = $t.number(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,789');
});

test('$t.currency', () => {
  const input = 123456.789;
  const output = $t.currency(input);
  expect(output.replace(/\s/gi, ' ')).toEqual('123 456,79 €');
});

test('$t.date', () => {
  const input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  const output = $t.date(input);
  expect(output).toBe('01/02/2000');
});

test('$t.time', () => {
  const input = new Date(Date.UTC(2000, 1, 1, 1, 1, 1));
  const output = $t.time(input);
  expect(output).toBe('02:01');
});
