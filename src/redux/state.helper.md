# State Helper

## Usage

### Import

```javascript
import * as StateHelper from 'starter-lib/dist/redux/state.helper';
```

### `StateHelper.createFetchActions`

```javascript
const MODULE = 'Task';

const INITIAL_STATE = {
  index: null,
};

const fetchIndex = StateHelper.createFetchActions(MODULE, 'fetchIndex');

export function $fetchIndex() {
  return (dispatch) => {
    dispatch(fetchIndex.request());

    return fetch(`${API_ENDPOINT}/path`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchIndex.success({ index: result.data })))
      .catch((error) => dispatch(fetchIndex.failure(error)))
      .finally(() => dispatch(Activity.$done()));
  };
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case fetchIndex.REQUEST:
      return {
        ...state,
        index: null,
      };
    case fetchIndex.SUCCESS:
      return {
        ...state,
        index: action.index,
      };
    case fetchIndex.FAILURE:
      return {
        ...state,
        index: null,
      };
    default:
      return state;
  }
}
```

### `StateHelper.create*Action`

```javascript
const INITIAL_STATE = {
  index: null,
};

const TASK_FETCH_INDEX_REQUEST = 'TASK_FETCH_INDEX_REQUEST';
const fetchIndexRequest = StateHelper.createRequestAction(TASK_FETCH_INDEX_REQUEST);

const TASK_FETCH_INDEX_SUCCESS = 'TASK_FETCH_INDEX_SUCCESS';
const fetchIndexSuccess = StateHelper.createIndexSuccessAction(TASK_FETCH_INDEX_SUCCESS);

const TASK_FETCH_INDEX_FAILURE = 'TASK_FETCH_INDEX_FAILURE';
const fetchIndexFailure = StateHelper.createFailureAction(TASK_FETCH_INDEX_FAILURE);

export function $fetchIndex() {
  return (dispatch) => {
    dispatch(fetchIndexRequest());

    return fetch(`${API_ENDPOINT}/path`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchIndexSuccess({ index: result.data })))
      .catch((error) => dispatch(fetchIndexFailure(error)))
      .finally(() => dispatch(Activity.$done()));
  };
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TASK_FETCH_INDEX_REQUEST:
      return {
        ...state,
        index: null,
      };
    case TASK_FETCH_INDEX_SUCCESS:
      return {
        ...state,
        index: action.index,
      };
    case TASK_FETCH_INDEX_FAILURE:
      return {
        ...state,
        index: null,
      };
    default:
      return state;
  }
}
```
