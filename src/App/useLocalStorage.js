import React from 'react';

const initialState = ({ initialValue }) => ({
  error: false,
  loading: true,
  item: initialValue,
  syncItem: true
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  saveItem: 'SAVEITEM',
  syncItems: 'SYNCITEMS',
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    syncItem: true,
    item: payload,
  },
  [actionTypes.saveItem]: {
    ...state,
    item: payload,
  },
  [actionTypes.syncItems]: {
    ...state,
    loading: true,
    syncItem: false,
  },
})

const reducer = (state, action) => {
  return (reducerObject(state, action.payload)[action.type] || state);
};

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));
  const { error, loading, item, syncItem } = state;

  /*   const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
    const [syncItem, setSyncItem] = React.useState(true); */

  const onError = (error) => {
    dispatch({ type: actionTypes.error, payload: error });
  }

  const onSuccess = (parsedItem) => {
    dispatch({ type: actionTypes.success, payload: parsedItem });
  }

  const onSaveItem = (newItem) => {
    dispatch({ type: actionTypes.saveItem, payload: newItem });
  }

  const onSyncItems = () => {
    dispatch({ type: actionTypes.syncItems });
  }

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem);
        /* setItem(parsedItem);
        setLoading(false);
        setSyncItem(true); */
      } catch (error) {
        onError(error);
      }
    }, 2000);
  }, [syncItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      //setItem(newItem);
      onSaveItem(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const syncItems = () => {
    onSyncItems();
    /*     setLoading(true);
        setSyncItem(false); */
  }

  return {
    item,
    saveItem,
    loading,
    error,
    syncItems
  };
}

export { useLocalStorage };

