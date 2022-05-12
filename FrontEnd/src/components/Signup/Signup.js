import React, { Fragment, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import axios from 'axios';
import Overlay from '../../Utilities/Overlay/Overlay';
import LoadingSpinner from '../../Utilities/LoadingSpinner/LoadingSpinner';
import Alert from '../../Utilities/Alert/Alert';
import './Signup.css';
import { axiosInstance } from './../../config';

let status, msg;

const Signup = () => {
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      passwordConfirm: passwordConfirmInputRef.current.value,
    };

    let url = `/api/v1/users/signup`;
    try {
      console.log(url);
      const res = await axiosInstance.post(url, data);
      if (res.data.status === 'success') {
        status = 'success';
        msg = 'Logged In Successfully';
        const userId = res.data.data.user._id;
        setTimeout(() => {
          history.replace(`/overview/${userId}`);
        }, 1000);
      }
    } catch (err) {
      status = 'error';
      msg = err.response.data.message;
      if (msg.includes('passwordConfirm')) msg = 'Passwords dont match!';
    } finally {
      setIsLoading(false);
      if (!alert) setAlert(true);
      else {
        setAlert(false);
        setAlert(true);
      }
    }
  };

  return (
    <Fragment>
      {alert && <Alert type={status} msg={msg} />}
      {isLoading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}
      <Header />
      <div className="container">
        <div className="login-form">
          <h2 className="heading-secondary heading-login ma-bt-lg">Create new account</h2>
          <form className="form form--login" id="login-form" onSubmit={submitHandler}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Username
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                placeholder="Oliver Queen"
                required="required"
                name="name"
                ref={nameInputRef}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required="required"
                name="email"
                ref={emailInputRef}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required="required"
                name="password"
                minlength="8"
                ref={passwordInputRef}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form__input"
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                name="passwordConfirm"
                required="required"
                minlength="8"
                ref={passwordConfirmInputRef}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Signup</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Signup;
