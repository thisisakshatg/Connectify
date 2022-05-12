import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HeaderOverview from './Header-Overview/HeaderOverview';
import HeroOverview from './Hero-Overview/HeroOverview';

const Overview = () => {
  const params = useParams();

  return (
    <Fragment>
      <HeaderOverview userId={params.userId} />
      <HeroOverview />
      <Footer />
    </Fragment>
  );
};

export default Overview;
