import React from 'react';
import './Merits.css';

const Merits = () => {
  return (
    <section className="section-merits" id="merits">
      <div className="row">
        <div className="col-1-of-4">
          <div className="feature-box">
            <i class="fas fa-ban"></i>
            <h3 className="heading-card u-margin-bottom-small">No More ads</h3>
            <p className="feature-box__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
              aspernatur.
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i class="fas fa-infinity"></i>
            <h3 className="heading-card u-margin-bottom-small">Limitless sharing</h3>
            <p className="feature-box__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
              aspernatur.
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i class="fas fa-clock"></i>
            <h3 className="heading-card u-margin-bottom-small">Set time limit</h3>
            <p className="feature-box__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
              aspernatur.
            </p>
          </div>
        </div>

        <div className="col-1-of-4">
          <div className="feature-box">
            <i class="fas fa-users"></i>
            <h3 className="heading-card u-margin-bottom-small">customer support</h3>
            <p className="feature-box__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
              aspernatur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Merits;
