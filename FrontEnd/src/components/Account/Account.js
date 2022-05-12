import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './Account.css';
import { useParams } from 'react-router-dom';
import Overlay from '../../Utilities/Overlay/Overlay';
import LoadingSpinner from './../../Utilities/LoadingSpinner/LoadingSpinner';
import Alert from './../../Utilities/Alert/Alert';
import { axiosInstance } from './../../config';

let status, msg;

const Account = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const params = useParams();
  const url = `/api/v1/users/${params.userId}`;

  useEffect(async () => {
    try {
      const res = await axiosInstance(url);
      if (res.data.status === 'success') {
        setUser(res.data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateUserInfoHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let url = `/api/v1/users/updateMe`;
    let data = {};
    if (e.target.classList.contains('form-user-settings')) {
      url = `/api/v1/users/updatePassword`;
      data = {
        passwordCurrent: formData.get('passwordCurrent'),
        password: formData.get('password'),
        passwordConfirm: formData.get('passwordConfirm'),
      };
    } else {
      data = formData;
    }
    try {
      const res = await axiosInstance({
        method: 'PATCH',
        url: url,
        data,
      });
      if (res.data.status === 'success') {
        status = 'success';
        msg = 'Updated Successfully';
      }
    } catch (err) {
      status = 'error';
      msg = err.response.data.message;
      console.log(err);
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
      <div className="account-box">
        <div className="user-view">
          <nav className="user-view__menu">
            <ul className="side-nav">
              <li className="side-nav--active">
                <a href="#">
                  <i className="fas fa-cog"></i>
                  Settings
                </a>
              </li>
              <li>
                <a href="/my-tours">
                  <i className="fas fa-clipboard"></i>
                  My posts
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-comment"></i>
                  My comments
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-dollar-sign"></i>
                  My billings
                </a>
              </li>
            </ul>
            {user.role === 'admin' && (
              <div className="admin-nav">
                <h5 className="admin-nav__heading">Admin</h5>
                <ul className="side-nav">
                  <li>
                    <a href="#">
                      <i className="fas fa-pen-fancy"></i>
                      Manage Posts
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-users"></i>
                      Manage users
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-print"></i>
                      Manage reports
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-laptop-code"></i>
                      Manage analytics
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
          <div className="user-view__content">
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md account-heading">Your account settings</h2>
              <form className="form form-user-data" onSubmit={updateUserInfoHandler}>
                <div className="form__group">
                  <label className="form__label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form__input"
                    id="name"
                    type="text"
                    defaultValue={user.name}
                    name="name"
                    required="required"
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="form__input"
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    name="email"
                    required="required"
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="status">
                    Status
                  </label>
                  <input
                    className="form__input"
                    id="status"
                    type="text"
                    defaultValue={user.status}
                    name="status"
                    required="required"
                  />
                </div>
                <div className="form__group form__photo-upload">
                  <img
                    className="form__user-photo"
                    src={process.env.PUBLIC_URL + '/content/imgs/' + user.photo}
                    alt="User photo"
                  />
                  <input
                    className="form__upload"
                    type="file"
                    accept="image/*"
                    id="photo"
                    name="photo"
                  />
                  <label htmlFor="photo" className="form__label fileInput">
                    Choose new photo
                  </label>
                </div>
                <div className="form__group right">
                  <button className="btn btn--small btn--green" id="userFormBtn">
                    Save settings
                  </button>
                </div>
              </form>
            </div>
            <div className="line">&nbsp;</div>
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md account-heading">Password change</h2>
              <form className="form form-user-settings" onSubmit={updateUserInfoHandler}>
                <div className="form__group">
                  <label className="form__label" htmlFor="password-current">
                    Current password
                  </label>
                  <input
                    className="form__input"
                    id="password-current"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="8"
                    name="passwordCurrent"
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="password">
                    New password
                  </label>
                  <input
                    className="form__input"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="8"
                    name="password"
                  />
                </div>
                <div className="form__group ma-bt-lg">
                  <label className="form__label" for="password-confirm">
                    Confirm password
                  </label>
                  <input
                    className="form__input"
                    id="password-confirm"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="8"
                    name="passwordConfirm"
                  />
                </div>
                <div className="form__group right">
                  <button className="btn btn--small btn--green btn--save-password">
                    Save password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Account;
