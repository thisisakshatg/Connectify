import React from 'react';
import './About.css';
import aboutImg from '../../../assets/about-img.png';
import custImg1 from '../../../assets/customers/customer-1.jpg';
import custImg2 from '../../../assets/customers/customer-2.jpg';
import custImg3 from '../../../assets/customers/customer-3.jpg';
import custImg4 from '../../../assets/customers/customer-4.jpg';
import custImg5 from '../../../assets/customers/customer-5.jpg';
import custImg6 from '../../../assets/customers/customer-6.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="section-about" id="about">
      <div className="about">
        <div className="about-text-box">
          <h1 className="heading-secondary">connect anytime, anywhere</h1>
          <p className="about-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur nemo possimus
            omnis, aliquid, aut saepe fugit perferendis quo dolorem nisi sed exercitationem
            doloribus quibusdam blanditiis qui sunt.
          </p>

          <div className="customers">
            <div className="customers-imgs-box">
              <img src={custImg1} alt="Customer phot" />
              <img src={custImg2} alt="Customer phot" />
              <img src={custImg3} alt="Customer phot" />
              <img src={custImg4} alt="Customer phot" />
              <img src={custImg5} alt="Customer phot" />
              <img src={custImg6} alt="Customer phot" />
            </div>
            <p className="customers-text">
              <span>250,000+</span> users and counting!!
            </p>
          </div>
          <div className="about-link-box">
            <ul className="about-nav-list">
              <li>
                <Link to="/signup" className="main-nav-link nav-action-link about-link">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="main-nav-link nav-action-link about-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="about-img-box">
          <img
            className="about-img"
            src={aboutImg}
            alt="People interacting with each other through technology"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
