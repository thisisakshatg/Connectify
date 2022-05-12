import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from './components/Account/Account';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Overview from './components/Overview/Overview';
import Profile from './components/Profile/Profile';
import Signup from './components/Signup/Signup';
import NotAvailable from './Utilities/NotAvailable/NotAvailable';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/overview/:userId" exact>
          <Overview />
        </Route>
        <Route path="/profile/:userId" exact>
          <Profile />
        </Route>
        <Route path="/profile/:userId/:followingId" exact>
          <Profile />
        </Route>
        <Route path="/account/:userId">
          <Account />
        </Route>
        <Route path="*">
          <Header />
          <NotAvailable />
          <Footer />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
