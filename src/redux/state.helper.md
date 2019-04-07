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

const $selectItem = StateHelper.createSimpleOperation(MODULE, 'selectItem', (item) => {
  return (dispatch) => {
    dispatch($selectItem.action({ item  }));

    return fetch(`${API_ENDPOINT}/task/${item.id}`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($selectItem.action({ item: result.item }));
  };
});

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case $selectItem.ACTION:
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
}

// `dispatch($selectItem(item))` in components
```

### `StateHelper.createAsyncOperation`

```javascript
const MODULE = 'Task';

const INITIAL_STATE = {
  tasks: null,
};

const $fetchTasks = StateHelper.createAsyncOperation(MODULE, 'fetchTasks', () => {
  return (dispatch) => {
    dispatch($fetchTasks.request());
    return fetch(`${API_ENDPOINT}/task`)
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($fetchTasks.success({ tasks: result.data })))
      .catch((error) => dispatch($fetchTasks.failure(error)));
  };
});

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case $fetchTasks.REQUEST:
      return {
        ...state,
        tasks: null,
      };
    case $fetchTasks.SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case $fetchTasks.FAILURE:
      return {
        ...state,
        tasks: null,
      };
    default:
      return state;
  }
}

// `dispatch($fetchTasks())` in components
```
