const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function defineLocale(locale, defaults = {}) {
  defaults = {
    timeZone: TIME_ZONE,
    currency: 'USD',
    ...defaults,
  };

  function $t(text, ...args) {
    args.forEach((arg) => (text = text.replace('%{}', arg)));
    return text;
  }

  $t.number = function number(value, options = {}) {
    return value.toLocaleString(locale, options);
  };

  // $t.currency = function currency(value, currency = defaults.currency, options = {}) {
  //   return `${value.toLocaleString(locale, options)} ${currency}`;
  // };

  $t.currency = function currency(value, currency = defaults.currency, options = {}) {
    return value.toLocaleString(locale, {
      style: 'currency',
      currency,
      ...options,
    });
  };

  $t.date = function date(value, options = {}) {
    return value.toLocaleDateString(locale, {
      ...options,
      timeZone: options.timeZone || defaults.timeZone,
    });
  };

  $t.time = function time(
    value,
    options = {
      hour: 'numeric',
      minute: 'numeric',
    },
  ) {
    return value.toLocaleTimeString(locale, {
      ...options,
      timeZone: options.timeZone || defaults.timeZone,
    });
  };

  $t.timestamp = function timestamp(value) {
    return `${$t.date(value)} at ${$t.time(value)}`;
  };

  return $t;
}

export const $t = defineLocale('en');
