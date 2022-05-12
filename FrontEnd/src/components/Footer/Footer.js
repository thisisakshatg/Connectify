import React from 'react';
import './Footer.css';
import footerLogo from '../../assets/Footer-logo.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <img src={footerLogo} alt="Natours logo" />
      </div>
      <ul className="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <a className="footer__copyright">
        &copy; <span>Akshat Gupta</span>. All rights reserved.
      </a>
    </div>
  );
};

export default Footer;
