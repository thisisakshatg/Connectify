import React from 'react';
import './Action.css';
import caitImg from '../../../assets/Cait.png';
import rachImg from '../../../assets/Rach.png';
import logo from '../../../assets/logo-white.png';
import { Link } from 'react-router-dom';

const Action = () => {
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src={logo} alt="Natours logo" className="" />
        </div>
        <img src={rachImg} alt="" className="cta__img cta__img--1" />
        <img src={caitImg} alt="" className="cta__img cta__img--2" />

        <div className="cta__content">
          <h2 className="heading-secondary heading-cta">What are you waiting for?</h2>
          <p className="cta__text">Come and join us today! Exciting times await</p>
          <Link to="/signup" className="main-nav-link nav-action-link about-link span-all-rows">
            Signup
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Action;
