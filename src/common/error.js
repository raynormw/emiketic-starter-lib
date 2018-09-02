export class BaseError extends Error {
  static from(err, {
    code, message, extra, ...more
  } = {}) {
    const error = new this(code || err.code, message || err.message, {
      ...(err.extra || {}),
      ...(extra || {}),
      ...more,
    });
    error.stack = err.stack || error.stack;
    return error;
  }

  constructor(code, message = '', extra = {}) {
    if (!message) {
      message = code;
      code = 'Unknown';
    }
    super(message);
    this.name = 'BaseError';
    this.code = code;
    this.extra = extra;
  }
}

export class FailureError extends BaseError {
  constructor(...args) {
    super(...args);
    this.name = 'FailureError';
  }
}

export class FetchError extends FailureError {
  constructor(...args) {
    super(...args);
    this.name = 'FetchError';
  }
}

export class ValidationError extends FailureError {
  constructor(...args) {
    super(...args);
    this.name = 'ValidationError';
  }
}
