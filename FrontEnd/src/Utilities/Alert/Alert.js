import React, { useState, useEffect, Fragment } from 'react';
import './Alert.css';

const Alert = (props) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      {showAlert && <div className={`alert alert--${props.type}`}>{props.msg}</div>}
    </Fragment>
  );
};

export default Alert;
