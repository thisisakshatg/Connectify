import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Hero from '../Home/Hero/Hero';
import About from '../Home/About/About';
import Main from '../Home/Main/Main';
import Merits from '../Home/Merits/Merits';
import Testemonials from '../Home/Testemonials/Testemonials';
import FeaturedIn from '../Home/FeaturedIn/FeaturedIn';
import Footer from '../Footer/Footer';
import Action from '../Home/Action/Action';

const Home = () => {
  return (
    <Fragment>
      <Header />
      <Main>
        <Hero />
        <About />
        <Merits />
        <FeaturedIn />
        <Testemonials />
        <Action />
        <Footer />
      </Main>
    </Fragment>
  );
};

export default Home;
