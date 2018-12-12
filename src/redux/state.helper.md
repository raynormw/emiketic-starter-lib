# State Helper

## Usage

### Import

```javascript
import * as StateHelper from 'starter-lib/dist/redux/state.helper';
```

### `StateHelper.createAction`

```javascript
const MODULE = 'Task';

const INITIAL_STATE = {
  item: null,
};

const selectItem = StateHelper.createAction(MODULE, 'selectItem');

export function $selectItem(item) {
  return (dispatch) => {
    dispatch(selectItem.perform({ item  }));

    return fetch(`${API_ENDPOINT}/task/${item.id}`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(selectItem.perform({ item: result.item }));
  };
}

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case selectItem.ACTION:
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

const fetchIndex = StateHelper.createAsyncOperation(MODULE, 'fetchIndex');

export function $fetchIndex() {
  return (dispatch) => {
    dispatch(Activity.$processing());
    dispatch(fetchIndex.request());

    return fetch(`${API_ENDPOINT}/task`)
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

