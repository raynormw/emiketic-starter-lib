"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSimpleOperation = createSimpleOperation;
exports.createAsyncOperation = createAsyncOperation;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
function createSimpleOperation(module, name) {
  var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var operation = "".concat(module, ".").concat(name);
  var ACTION = "".concat(operation, ".ACTION");
  var config = {
    MODULE: module,
    NAME: name,
    OPERATION: operation,
    ACTION: ACTION,
    action: function action() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread({
        type: ACTION
      }, payload);
    }
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


function createAsyncOperation(module, name) {
  var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var operation = "".concat(module, ".").concat(name);
  var REQUEST = "".concat(operation, ".REQUEST");
  var SUCCESS = "".concat(operation, ".SUCCESS");
  var FAILURE = "".concat(operation, ".FAILURE");
  var config = {
    MODULE: module,
    NAME: name,
    OPERATION: operation,
    REQUEST: REQUEST,
    request: function request() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread({
        type: REQUEST
      }, input);
    },
    SUCCESS: SUCCESS,
    success: function success() {
      var output = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return function (dispatch) {
        dispatch(_objectSpread({
          type: SUCCESS
        }, output));
        return output;
      };
    },
    FAILURE: FAILURE,
    failure: function failure(error) {
      return function (dispatch) {
        dispatch({
          type: FAILURE
        });
        throw error;
      };
    }
  };

  if (action) {
    Object.assign(action, config);
    action.config = config;
    return action;
  }

  return config;
}
//# sourceMappingURL=state.helper.js.map