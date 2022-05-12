import React, { Fragment } from 'react';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import HeroProfile from './HeroProfile/HeroProfile';
import Footer from './../Footer/Footer';

const Profile = () => {
  return (
    <Fragment>
      <HeaderProfile />
      <HeroProfile />
      <Footer />
    </Fragment>
  );
};

export default Profile;
