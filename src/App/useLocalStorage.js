import React from 'react';

const initialState = ({initialValue}) => ({
  error: false,
  loading:true,
  item:initialValue,
  syncItem :true
});

const actionTypes = {
  error: 'ERROR',
  writeinput: 'WRITEINPUT',
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.writeinput]: {
    ...state,
    value: payload
  },
})

const reducer = (state, action) => {
  return (reducerObject(state, action.payload)[action.type] || state);
};

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({initialValue}));
  const { error, loading, item, syncItem } = state;

/*   const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);
  const [syncItem, setSyncItem] = React.useState(true); */

  const onError = () => {
    dispatch({ type: actionTypes.error });
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

        setItem(parsedItem);
        setLoading(false);
        setSyncItem(true);
      } catch (error) {
        setError(error);
      }
    }, 2000);
  }, [syncItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };

  const syncItems = () => {
    setLoading(true);
    setSyncItem(false);
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
