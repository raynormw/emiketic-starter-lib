"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSimpleOperation = createSimpleOperation;
exports.createAsyncOperation = createAsyncOperation;
exports.createIndexMetaActions = createIndexMetaActions;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Action creator factory for simple operation
 */
function createSimpleOperation(module, name) {
  var TYPE = "".concat(module, ".").concat(name);
  return {
    module: module,
    name: name,
    TYPE: TYPE,
    action: function action() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread({
        type: TYPE
      }, payload);
    }
  };
}
/**
 * Action creators factory for typical async operation
 */


function createAsyncOperation(module, name) {
  var prefix = "".concat(module, ".").concat(name);
  var REQUEST = "".concat(prefix, ".REQUEST");
  var SUCCESS = "".concat(prefix, ".SUCCESS");
  var FAILURE = "".concat(prefix, ".FAILURE");
  return {
    module: module,
    name: name,
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
}
/**
 * Action creators makers for typical index view
 */


var INDEX_PAGE_SIZE_DEFAULT = 50;

function createIndexMetaActions(substate, actionType) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  function $reset() {
    return {
      type: actionType,
      meta: {
        filter: defaults.filter || '',
        sort: defaults.sort || '',
        page: 1,
        pageSize: defaults.pageSize || INDEX_PAGE_SIZE_DEFAULT
      }
    };
  }

  function $filter() {
    var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return {
      type: actionType,
      meta: {
        filter: filter,
        page: 1
      }
    };
  }

  function $sort() {
    var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return {
      type: actionType,
      meta: {
        sort: sort,
        page: 1
      }
    };
  }

  function $pageSize() {
    var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INDEX_PAGE_SIZE_DEFAULT;

    if (pageSize < 1) {
      pageSize = 10;
    }

    if (pageSize > 100) {
      pageSize = 100;
    }

    return {
      type: actionType,
      meta: {
        pageSize: pageSize,
        page: 1
      }
    };
  }

  function $page() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return function (dispatch, getState) {
      var meta = getState()[substate].meta;

      if (page < 1) {
        page = 1;
      }

      if (page > meta.pageTotal) {
        page = meta.pageTotal - 1;
      }

      dispatch({
        type: actionType,
        meta: {
          page: page
        }
      });
    };
  }

  return {
    $reset: $reset,
    $filter: $filter,
    $sort: $sort,
    $pageSize: $pageSize,
    $page: $page
  };
}
//# sourceMappingURL=state.helper.js.map