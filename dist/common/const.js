'use strict';

var CONST = module.exports = {};

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

CONST.LANGUAGE = Object.freeze({
  ENGLISH: 'en',
  FRENCH: 'fr'
});

CONST.ROLE = Object.freeze({
  CLIENT: 'client',
  ADMIN: 'admin'
});
//# sourceMappingURL=const.js.map