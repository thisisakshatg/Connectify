import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../../../assets/logo-white.png';
import './HeaderOverview.css';
import Overlay from './../../../Utilities/Overlay/Overlay';
import Like from './../../../Utilities/Likes/Like';
import Alert from './../../../Utilities/Alert/Alert';
import LoadingSpinner from './../../../Utilities/LoadingSpinner/LoadingSpinner';

let status, msg;
let allSearchResults = [];
let allSearchRenderedResults = [];

const HeaderOverview = (props) => {
  const history = useHistory();
  const searchRef = useRef();
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance('/api/v1/users/logout');

      if (res.data.status === 'success') {
        status = 'success';
        msg = 'Logged Out Successfully';

        setTimeout(() => {
          history.replace(`/login`);
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

  const [modalSearch, setModalSearch] = useState(false);

  const params = useParams();
  const url = `/api/v1/users/${props.userId}`;
  const [user, setUser] = useState({});
  const [name, setName] = useState('');

  const searchOverlayHandler = async (e) => {
    if (e.key === 'Enter') {
      const name = searchRef.current.value;
      setIsSearchLoading(true);
      try {
        const res = await axiosInstance(`/api/v1/users/getUser/${name}`);
        if (res.data.status === 'success') {
          allSearchResults = res.data.data.data;
        }
      } catch (err) {
        console.log(err);
      }
      setIsSearchLoading(false);
      setModalSearch(true);
    }
    if (modalSearch) setModalSearch(false);
  };

  useEffect(async () => {
    setIsPostsLoading(true);
    try {
      const res = await axiosInstance(url);
      if (res.data.status === 'success') {
        setUser(res.data.data.data);
        setName(res.data.data.data.name.split(' ')[0]);
      }
    } catch (err) {
      console.log(err);
    }
    setIsPostsLoading(false);
  }, [user]);

  allSearchRenderedResults = allSearchResults.map((user) => <Like key={user._id} user={user} />);

  let errorMsg = '';
  if (allSearchResults.length === 0)
    errorMsg = (
      <div className="search-error-box">
        <p className="empty-post-msg">No users found 😟</p>
        <p className="empty-post-msg">Please go back and try again!</p>
      </div>
    );

  return (
    <Fragment>
      {alert && <Alert type={status} msg={msg} />}
      {isLoading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}
      <header className="header header-overview">
        <div className="header-name-box">
          <span className="heading-header">Connec</span>
          <div>
            <img alt="Logo" src={logo} className="logo" />
          </div>
          <span className="heading-header">ify</span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Type something to start the search"
            className="form__input header__input"
            onKeyPress={searchOverlayHandler}
            ref={searchRef}
          ></input>

          {isSearchLoading && (
            <Overlay>
              <LoadingSpinner />
            </Overlay>
          )}

          {isPostsLoading && (
            <Overlay>
              <LoadingSpinner />
            </Overlay>
          )}

          {modalSearch && (
            <Overlay>
              <div className="all-like-box">
                <div>
                  <h2 className="heading-secondary">Search Results</h2>
                  {errorMsg}
                  <div>{allSearchRenderedResults}</div>
                </div>
                <button className="btn-mobile-nav" onClick={searchOverlayHandler}>
                  <ion-icon name="close" class="overlay-close"></ion-icon>
                </button>
              </div>
            </Overlay>
          )}
        </div>

        <button className="btn-mobile-nav">
          <i className="far fa-heart"></i>
        </button>
        <button className="btn-mobile-nav">
          <i className="far fa-comment"></i>
        </button>
        <button onClick={logoutHandler} className="btn btn--logout">
          Logout
        </button>
        <Link className="nav__el" to={`/profile/${params.userId}`}>
          <img
            className="nav__user-img"
            src={process.env.PUBLIC_URL + '/content/imgs/' + user.photo}
            alt="User Photo"
          />
          <span>{name}</span>
        </Link>
      </header>
    </Fragment>
  );
};

export default HeaderOverview;
