# State Helper

## Usage

### Import

```javascript
import * as StateHelper from 'starter-lib/dist/redux/state.helper';
```

### `StateHelper.createSimpleOperation`

```javascript
const MODULE = 'Task';

const INITIAL_STATE = {
  item: null,
};

const selectItem = StateHelper.createSimpleOperation(MODULE, 'selectItem');

export function $selectItem(item) {
  return (dispatch) => {
    dispatch(selectItem.action({ item  }));

    return fetch(`${API_ENDPOINT}/task/${item.id}`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(selectItem.action({ item: result.item }));
  };
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case selectItem.TYPE:
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
}
```

### `StateHelper.createAsyncOperation`

```javascript
const MODULE = 'Task';

const INITIAL_STATE = {
  index: null,
};

const fetchTasks = StateHelper.createAsyncOperation(MODULE, 'fetchTasks');

export function $fetchTasks() {
  return (dispatch) => {
    dispatch(fetchTasks.request());
    return fetch(`${API_ENDPOINT}/task`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchTasks.success({ index: result.data })))
      .catch((error) => dispatch(fetchTasks.failure(error)));
  };
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case fetchTasks.REQUEST:
      return {
        ...state,
        index: null,
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        index: action.index,
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        index: null,
      };
    default:
      return state;
  }
}
```
