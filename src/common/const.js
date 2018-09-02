const CONST = (module.exports = {});

function constantify(values, override = {}) {
  values = values.filter(Boolean);

  values.forEach((value) => {
    values[value.replace(/[^a-z0-9]+/g, '_').toUpperCase()] = value;
  });

  Object.assign(values, override);

  values.normalize = function normalize(value, defaultValue) {
    return this.indexOf(value) !== -1 ? value : defaultValue || this[0];
  };

  return Object.freeze(values);
}

CONST.constantify = constantify;

/**
 * Time Constants
 */

CONST.DURATION_SECOND = 1000;
CONST.DURATION_MINUTE = 60 * CONST.DURATION_SECOND;
CONST.DURATION_HOUR = 60 * CONST.DURATION_MINUTE;
CONST.DURATION_DAY = 24 * CONST.DURATION_HOUR;
CONST.DURATION_WEEK = 7 * CONST.DURATION_DAY;

/**
 * Shared Constants
 */

CONST.LANGUAGE = CONST.constantify(['en', 'fr'], {
  ENGLISH: 'en',
  FRENCH: 'fr',
});

CONST.SCOPE = CONST.constantify(['admin', 'client']);
