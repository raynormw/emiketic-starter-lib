/**
 * Action creator factory for simple operation
 */

export function createSimpleOperation(module, name) {
  const ACTION = `${module}_${name}`;

  return {
    module,

    name,

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
 * Action creators factory for typical async operation
 */

export function createAsyncOperation(module, name) {
  const prefix = `${module}_${name}`;

  const REQUEST = `${prefix}_REQUEST`;
  const SUCCESS = `${prefix}_SUCCESS`;
  const FAILURE = `${prefix}_FAILURE`;

  return {
    module,

    name,

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
