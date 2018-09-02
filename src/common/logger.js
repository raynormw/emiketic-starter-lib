/* eslint-disable no-underscore-dangle */

import createDebug from 'debug';

export function enable(namespace) {
  createDebug.enable(namespace);
}

export function disable() {
  createDebug.disable();
}

let PREFIX = '';

export function createLogger(ns = '', { ignorePrefix = false } = {}) {
  const namespace = (!ignorePrefix && PREFIX ? PREFIX : '') + (!ignorePrefix && ns ? ':' : '') + ns;

  const _debugLogger = createDebug(namespace);
  _debugLogger.log = console.log.bind(`${namespace}`);

  const _infoLogger = createDebug(`${namespace}`);
  _infoLogger.log = console.info.bind(console);

  const _warnLogger = createDebug(`${namespace}`);
  _warnLogger.log = console.warn.bind(console);

  const _errorLogger = createDebug(`${namespace}`);
  _errorLogger.log = console.error.bind(console);

  return {
    namespace,
    _debugLogger,
    debug(...args) {
      _debugLogger('DEBUG', ...args);
    },
    _infoLogger,
    info(...args) {
      _infoLogger('INFO', ...args);
    },
    _warnLogger,
    warn(...args) {
      _warnLogger('WARN', ...args);
    },
    _errorLogger,
    error(...args) {
      _errorLogger('ERROR', ...args);
    },
  };
}

let LOGGER = null;

export function setup(namespace) {
  PREFIX = namespace;
  LOGGER = createLogger();
}

export function debug(...args) {
  if (LOGGER) {
    LOGGER.debug(...args);
  }
}

export function info(...args) {
  if (LOGGER) {
    LOGGER.info(...args);
  }
}

export function warn(...args) {
  if (LOGGER) {
    LOGGER.warn(...args);
  }
}

export function error(...args) {
  if (LOGGER) {
    LOGGER.error(...args);
  }
}
