/**
 * @typedef {Object<Function>} SimpleOperationFunction
 * @prop {string} MODULE
 * @prop {string} NAME
 * @prop {string} OPERATION
 * @prop {string} ACTION
 * @prop {function} action
 */

/**
 * @typedef {Object} AsyncOperationFunction
 * @prop {string} MODULE
 * @prop {string} NAME
 * @prop {string} OPERATION
 * @prop {string} REQUEST
 * @prop {function} request
 * @prop {string} SUCCESS
 * @prop {function} success
 * @prop {string} FAILURE
 * @prop {function} failure
 */

/**
 * Action creator factory for simple operation
 *
 * @template T
 * @param {string} module
 * @param {string} name
 * @param {T} action
 * @returns {T&SimpleOperationFunction} input action augmented by helpers
 */

export function createSimpleOperation(module, name, action = null) {
  const operation = `${module}.${name}`;

  const ACTION = `${operation}.ACTION`;

  const config = {
    MODULE: module,
    NAME: name,
    OPERATION: operation,

    ACTION,
    action(payload = {}) {
      return {
        type: ACTION,
        ...payload,
      };
    },
  };

  if (action) {
    Object.assign(action, config);
    action.config = config;
    return action;
  }

  return config;
}

/**
 * Action creators factory for typical async operation
 *
 * @template T
 * @param {string} module
 * @param {string} name
 * @param {T} action
 * @returns {T&AsyncOperationFunction} input action augmented by helpers
 */

export function createAsyncOperation(module, name, action = null) {
  const operation = `${module}.${name}`;

  const REQUEST = `${operation}.REQUEST`;
  const SUCCESS = `${operation}.SUCCESS`;
  const FAILURE = `${operation}.FAILURE`;

  const config = {
    MODULE: module,
    NAME: name,
    OPERATION: operation,

    REQUEST,
    request(input = {}) {
      return {
        type: REQUEST,
        ...input,
      };
    },

    SUCCESS,
    success(output = {}) {
      return (dispatch) => {
        dispatch({
          type: SUCCESS,
          ...output,
        });

        return output;
      };
    },

    FAILURE,
    failure(error) {
      return (dispatch) => {
        dispatch({
          type: FAILURE,
        });

        throw error;
      };
    },
  };

  if (action) {
    Object.assign(action, config);
    action.config = config;
    return action;
  }

  return config;
}
