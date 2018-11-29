'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createAction = createAction;
exports.createAsyncOperation = createAsyncOperation;
exports.createIndexMetaActions = createIndexMetaActions;
exports.createRequestAction = createRequestAction;
exports.createSuccessAction = createSuccessAction;
exports.createFailureAction = createFailureAction;
/**
 * Action creator factory for typical action
 */

function createAction(module, actionTypePrefix) {
  var ACTION = module + '_' + actionTypePrefix;

  return {
    ACTION: ACTION,

    perform: function perform() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({
        type: ACTION
      }, payload);
    }
  };
}

/**
 * Action creators factory for typical async operation
 */

function createAsyncOperation(module, actionTypePrefix) {
  var prefix = module + '_' + actionTypePrefix;

  var REQUEST = prefix + '_REQUEST';
  var SUCCESS = prefix + '_SUCCESS';
  var FAILURE = prefix + '_FAILURE';

  return {
    REQUEST: REQUEST,

    request: function request() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({
        type: REQUEST
      }, input);
    },


    SUCCESS: SUCCESS,

    success: function success() {
      var output = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return function (dispatch) {
        dispatch(_extends({
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

/**
 * DEPRECATED
 */

function createRequestAction(actionType) {
  console.warn('DEPRECATED: use createAction or createAsyncOperation');
  return function request() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _extends({
      type: actionType
    }, payload);
  };
}

function createSuccessAction(actionType) {
  console.warn('DEPRECATED: use createAction or createAsyncOperation');
  return function success() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (dispatch) {
      dispatch(_extends({
        type: actionType
      }, payload));

      return payload;
    };
  };
}

function createFailureAction(actionType) {
  console.warn('DEPRECATED: use createAction or createAsyncOperation');
  return function failure(error) {
    return function (dispatch) {
      dispatch({
        type: actionType
      });

      throw error;
    };
  };
}
//# sourceMappingURL=state.helper.js.map