/**
 * Action creator factory for typical action
 */

export function createAction(module, actionTypePrefix) {
  const ACTION = `${module}_${actionTypePrefix}`;

  return {
    ACTION,

    perform(payload = {}) {
      return {
        type: ACTION,
        ...payload,
      };
    },
  };
}

/**
 * Action creators factory for typical fetch operation
 */

export function createFetchActions(module, actionTypePrefix) {
  const prefix = `${module}_${actionTypePrefix}`;

  const REQUEST = `${prefix}_REQUEST`;
  const SUCCESS = `${prefix}_SUCCESS`;
  const FAILURE = `${prefix}_FAILURE`;

  return {
    REQUEST,

    request(parameters = {}) {
      return {
        type: REQUEST,
        ...parameters,
      };
    },

    SUCCESS,

    success(payload = {}) {
      return (dispatch) => {
        dispatch({
          type: SUCCESS,
          ...payload,
        });

        return payload;
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
}

export function createRequestAction(actionType) {
  return function request(payload = {}) {
    return {
      type: actionType,
      ...payload,
    };
  };
}

export function createSuccessAction(actionType) {
  return function success(payload = {}) {
    return (dispatch) => {
      dispatch({
        type: actionType,
        ...payload,
      });

      return payload;
    };
  };
}

export function createFailureAction(actionType) {
  return function failure(error) {
    return (dispatch) => {
      dispatch({
        type: actionType,
      });

      throw error;
    };
  };
}

/**
 * Action creators makers for typical index view
 */

const INDEX_PAGE_SIZE_DEFAULT = 50;

export function createIndexMetaActions(substate, actionType, defaults = {}) {
  function $reset() {
    return {
      type: actionType,
      meta: {
        filter: defaults.filter || '',
        sort: defaults.sort || '',
        page: 1,
        pageSize: defaults.pageSize || INDEX_PAGE_SIZE_DEFAULT,
      },
    };
  }

  function $filter(filter = '') {
    return {
      type: actionType,
      meta: {
        filter,
        page: 1,
      },
    };
  }

  function $sort(sort = '') {
    return {
      type: actionType,
      meta: {
        sort,
        page: 1,
      },
    };
  }

  function $pageSize(pageSize = INDEX_PAGE_SIZE_DEFAULT) {
    if (pageSize < 1) {
      pageSize = 10;
    }

    if (pageSize > 100) {
      pageSize = 100;
    }

    return {
      type: actionType,
      meta: {
        pageSize,
        page: 1,
      },
    };
  }

  function $page(page = 1) {
    return (dispatch, getState) => {
      const { meta } = getState()[substate];

      if (page < 1) {
        page = 1;
      }

      if (page > meta.pageTotal) {
        page = meta.pageTotal - 1;
      }

      dispatch({
        type: actionType,
        meta: {
          page,
        },
      });
    };
  }

  return {
    $reset,
    $filter,
    $sort,
    $pageSize,
    $page,
  };
}

export function createIndexSuccessAction(actionType) {
  return function success({ data, meta }) {
    return (dispatch) => {
      dispatch({
        type: actionType,
        data,
        meta,
      });

      return { data, meta };
    };
  };
}

export function createItemSuccessAction(actionType) {
  return function success({ item }) {
    return (dispatch) => {
      dispatch({
        type: actionType,
        item,
      });

      return { item };
    };
  };
}
