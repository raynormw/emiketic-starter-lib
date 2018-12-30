export function defineLocale(
  locale,
  defaults = {
    currency: '?',
  },
) {
  function $t(text, ...args) {
    args.forEach((arg) => (text = text.replace('%{}', arg)));
    return text;
  }

  $t.number = (value, options = {}) => value.toLocaleString(locale, options);

  // $t.currency = (value, currency = defaults.currency, options = {}) => `${value.toLocaleString(locale, options)} ${currency}`;

  $t.currency = (value, currency = defaults.currency, options = {}) => value.toLocaleString(locale, {
    style: 'currency',
    currency,
    ...options,
  });

  $t.date = (value, options = {}) => value.toLocaleDateString(locale, options);

  $t.time = (
    value,
    options = {
      hour: 'numeric',
      minute: 'numeric',
    },
  ) => value.toLocaleTimeString(locale, options);

  $t.timestamp = (value) => `${$t.date(value)} at ${$t.time(value)}`;

  return $t;
}

export const $t = defineLocale('en', {
  currency: 'USD',
});
