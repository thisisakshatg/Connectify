import React from 'react';
import coverImg from '../../../assets/cover-img.jpg';
import './Hero.css';

const Hero = () => {
  return (
    <section className="section-header">
      <header className="header__hero">
        <div className="header__hero-overlay"></div>
        <img className="header__hero-img" src={coverImg} alt="Cover Img" />
      </header>
      <div className="heading-box">
        <h2 className="intro">Engage and entertain</h2>
      </div>
    </section>
  );
};

export default Hero;
