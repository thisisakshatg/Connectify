import React, { Fragment, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Login.css';
import { axiosInstance } from '../../config';
import Alert from '../../Utilities/Alert/Alert';
import LoadingSpinner from '../../Utilities/LoadingSpinner/LoadingSpinner';
import Overlay from './../../Utilities/Overlay/Overlay';

let status, msg;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const emailInputRef = useRef();
  const pwdInputRef = useRef();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = pwdInputRef.current.value;
    emailInputRef.current.value = '';
    pwdInputRef.current.value = '';
    setIsLoading(true);

    try {
      const res = await axiosInstance({
        method: 'POST',
        url: '/api/v1/users/login',
        data: {
          email: email,
          password: password,
        },
      });

      if (res.data.status === 'success') {
        const resData = await axiosInstance({
          method: 'POST',
          url: '/api/v1/users',
          data: {
            email,
          },
        });

        const userId = resData.data.data.user._id;
        status = 'success';
        msg = 'Logged In Successfully';

        setTimeout(() => {
          history.replace(`/overview/${userId}`);
        }, 1000);
      }
    } catch (err) {
      status = 'error';
      msg = err.response.data.message;
      console.log(err.response.data.message);
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
          <h2 className="heading-secondary heading-login ma-bt-lg">Log into your account</h2>
          <form className="form form--login" id="login-form" onSubmit={submitHandler}>
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
                minLength="8"
                ref={pwdInputRef}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">Login</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
