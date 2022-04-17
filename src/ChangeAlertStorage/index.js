import React from 'react';
import { useStorageListener } from './useStorageListener';

function ChangeAlertStorage({syncItems}) {
  const { showAlert, toggleShow } = useStorageListener(syncItems);
  if (showAlert) {
    const refreshPage = () => {
      toggleShow()
    }
    return <>
      <p>There were changes, Refresh this site. </p>
      <button onClick={refreshPage}>
        Refresh site here (f5)
      </button>
    </>
  } else {
    return null
  }
}

export { ChangeAlertStorage };


