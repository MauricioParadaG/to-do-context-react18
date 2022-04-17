import React, { useState } from 'react';

function withStorageListener(WrappedComponent) {
  return function WrappedComponentWithStorageListener(props) {
    const [storageChange, setStoragechange] = useState(false);
    window.addEventListener('storage', (change) => {
      if (change.key === 'TODOS_V1') {
        return setStoragechange(true);
      }
    });

    const toggleShow = () => {
      setStoragechange(false);
      props.syncItems()
    }

    return (
      <WrappedComponent
        showAlert={storageChange}
        toggleShow={toggleShow}
      />)
  };
}

export { withStorageListener };


