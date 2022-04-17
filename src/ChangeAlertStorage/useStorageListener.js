import React, { useState } from 'react';

function useStorageListener(syncItems) {

  const [storageChange, setStoragechange] = useState(false);
  window.addEventListener('storage', (change) => {
    if (change.key === 'TODOS_V1') {
      return setStoragechange(true);
    }
  });

  const toggleShow = () => {
    setStoragechange(false);
    syncItems()
  }

  return {
    showAlert: storageChange,
    toggleShow
  }
}

export { useStorageListener };


