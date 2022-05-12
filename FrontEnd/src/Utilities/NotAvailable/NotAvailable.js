import React from 'react';
import './NotAvailable.css';

const NotAvailable = () => {
  return (
    <div className="error-container">
      <div class="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-page--error">Uh oh! This page does not exist</h2>
          <h2 className="error__emoji">😢 🤯</h2>
        </div>
        <div className="error__msg">Please check the url again</div>
      </div>
    </div>
  );
};

export default NotAvailable;
