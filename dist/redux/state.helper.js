'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createAction = createAction;
exports.createFetchActions = createFetchActions;
exports.createRequestAction = createRequestAction;
exports.createSuccessAction = createSuccessAction;
exports.createFailureAction = createFailureAction;
exports.createIndexMetaActions = createIndexMetaActions;
exports.createIndexSuccessAction = createIndexSuccessAction;
exports.createItemSuccessAction = createItemSuccessAction;
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
 * Action creators factory for typical fetch operation
 */

function createFetchActions(module, actionTypePrefix) {
  var prefix = module + '_' + actionTypePrefix;

  var REQUEST = prefix + '_REQUEST';
  var SUCCESS = prefix + '_SUCCESS';
  var FAILURE = prefix + '_FAILURE';

  return {
    REQUEST: REQUEST,

    request: function request() {
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({
        type: REQUEST
      }, parameters);
    },


    SUCCESS: SUCCESS,

    success: function success() {
      var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return function (dispatch) {
        dispatch(_extends({
          type: SUCCESS
        }, payload));

        return payload;
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

function createRequestAction(actionType) {
  return function request() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _extends({
      type: actionType
    }, payload);
  };
}

function createSuccessAction(actionType) {
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
  return function failure(error) {
    return function (dispatch) {
      dispatch({
        type: actionType
      });

      throw error;
    };
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

function createIndexSuccessAction(actionType) {
  return function success(_ref) {
    var data = _ref.data,
        meta = _ref.meta;

    return function (dispatch) {
      dispatch({
        type: actionType,
        data: data,
        meta: meta
      });

      return { data: data, meta: meta };
    };
  };
}

function createItemSuccessAction(actionType) {
  return function success(_ref2) {
    var item = _ref2.item;

    return function (dispatch) {
      dispatch({
        type: actionType,
        item: item
      });

      return { item: item };
    };
  };
}
//# sourceMappingURL=state.helper.js.map