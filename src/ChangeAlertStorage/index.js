import React from 'react';
import { withStorageListener } from './withStorageListener';

function ChangeAlertStorage({ showAlert, toggleShow }) {
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

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlertStorage);

export { ChangeAlertWithStorageListener };


