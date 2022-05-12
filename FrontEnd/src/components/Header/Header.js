import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-white.png';
import './Header.css';

const Header = () => {
  const [active, setIsActive] = useState(false);

  const headerHandler = () => {
    setIsActive(!active);
  };

  const headerClass = active ? 'header nav-open' : 'header';

  return (
    <header className={headerClass}>
      <div className="header-name-box">
        <span className="heading-header">Connec</span>
        <div>
          <img alt="Logo" src={logo} className="logo" />
        </div>
        <span className="heading-header">ify</span>
      </div>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <a href="#about" className="main-nav-link smooth-flag">
              About Us
            </a>
          </li>
          <li>
            <a href="#merits" className="main-nav-link smooth-flag">
              Merits
            </a>
          </li>
          <li>
            <a href="#featured" className="main-nav-link smooth-flag">
              Featured In
            </a>
          </li>
          <li>
            <a href="#stories" className="main-nav-link smooth-flag">
              Stories
            </a>
          </li>
          <li>
            <a href="/signup" className="main-nav-link nav-action-link smooth-flag">
              Signup
            </a>
          </li>
          <li>
            <Link to="/login" className="main-nav-link nav-action-link smooth-flag">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <button className="btn-mobile-nav" onClick={headerHandler}>
        <ion-icon name="menu-outline" class="icon-mobile-nav"></ion-icon>
        <ion-icon name="close-outline" class="icon-mobile-nav"></ion-icon>
      </button>
    </header>
  );
};

export default Header;
