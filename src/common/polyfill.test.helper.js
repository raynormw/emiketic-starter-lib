/**
 * Intl
 */

const LOCALES = ['en'];

if (global.Intl) {
  if (
    !Intl.NumberFormat
    || Intl.NumberFormat.supportedLocalesOf(LOCALES).length !== LOCALES.length
    || !Intl.DateTimeFormat
    || Intl.DateTimeFormat.supportedLocalesOf(LOCALES).length !== LOCALES.length
  ) {
    const IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  global.Intl = require('intl');
}
