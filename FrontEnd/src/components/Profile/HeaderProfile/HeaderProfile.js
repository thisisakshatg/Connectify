import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './HeaderProfile.css';
import NewPost from '../../NewPost/NewPost';
import HeaderOverview from '../../Overview/Header-Overview/HeaderOverview';
import Overlay from './../../../Utilities/Overlay/Overlay';
import LoadingSpinner from './../../../Utilities/LoadingSpinner/LoadingSpinner';
import { axiosInstance } from './../../../config';

let loggedInUser = {};

const HeaderProfile = () => {
  const params = useParams();

  let accountId = params.userId;
  if (params.followingId) accountId = params.followingId;

  const url = `/api/v1/users/${accountId}`;
  const userUrl = `/api/v1/users/${params.userId}`;
  const [user, setUser] = useState({});
  const [newPostOverlay, setNewPostOverlay] = useState(false);
  const [followState, setFollowState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const followHandler = async () => {
    try {
      if (loggedInUser) {
        let newArr = [];
        let counter = 0;
        let followingFollowerCount = 0;
        // for follow
        if (followState === 'Follow') {
          if (!loggedInUser.following.includes(accountId)) {
            loggedInUser.following.push(accountId);
            newArr = loggedInUser.following;
            counter = 1;
            followingFollowerCount = 1;
          }
        } else {
          newArr = loggedInUser.following.filter((id) => id !== accountId);
          counter = -1;
          followingFollowerCount = -1;
        }
        try {
          const res = await axiosInstance.patch(`/api/v1/users/${params.userId}`, {
            following: newArr,
            followingCount: loggedInUser.followingCount + counter,
          });
          if (res.data.status === 'success') {
            console.log('Data updated!!');
            const state = followState === 'Follow' ? 'Unfollow' : 'Follow';
            setFollowState(state);
          }
          const result = await axiosInstance.patch(`/api/v1/users/${accountId}`, {
            followerCount: user.followerCount + followingFollowerCount,
          });
          if (result.data.status === 'success') {
            setUser(user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // for new posts
  const newPostSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('user', params.userId);
    console.log(formData);
    const content = formData.get('content').name;
    const imgExt = ['jpg', 'jpeg', 'png', 'avif', 'apng', 'pjp', 'webp', 'svg', 'bmp'];
    const ext = content.split('.')[1];

    let url;
    if (imgExt.includes(ext)) url = `/api/v1/posts/create/contentImage`;
    else url = `/api/v1/posts/create/contentVideo`;

    try {
      const res = await axiosInstance({
        method: 'POST',
        url: url,
        data: formData,
      });
      if (res.data.status === 'success') {
        console.log('Post created successfully!!');
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const newPostOverlayHandler = () => {
    setNewPostOverlay(!newPostOverlay);
  };

  useEffect(async () => {
    try {
      const res = await axiosInstance(url);
      if (res.data.status === 'success') {
        setUser(res.data.data.data);
      }
      const result = await axiosInstance(userUrl);
      if (result.data.status === 'success') {
        loggedInUser = result.data.data.data;
        if (loggedInUser.following.includes(accountId)) setFollowState('Unfollow');
        else setFollowState('Follow');
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return (
    <Fragment>
      <HeaderOverview userId={params.userId} />
      {newPostOverlay && (
        <Overlay>
          <NewPost
            newPostSubmissionHandler={newPostSubmitHandler}
            newPostOverlayHandler={newPostOverlayHandler}
          />
        </Overlay>
      )}
      {isLoading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}
      <div className="profile-info-box">
        <img src={process.env.PUBLIC_URL + '/content/imgs/' + user.photo} className="profile-img" />
        <div>
          <span className="user-name">{user.name}</span>
          <div className="user-post-info">
            <span className="user-posts-number">{user.postCount} Posts</span>
            <span className="user-followers-number">{user.followerCount} Followers</span>
            <span className="user-following-number">{user.followingCount} Following</span>
          </div>
          <span className="user-status">{user.status}</span>
          <Link to={`/overview/${params.userId}`} className="overview-link">
            All Posts
          </Link>
          {params.followingId && (
            <button className="btn btn--green follow-btn" onClick={followHandler}>
              {followState}
            </button>
          )}
          {!params.followingId && (
            <button className="btn btn--green new-post-btn" onClick={newPostOverlayHandler}>
              New Post
            </button>
          )}
          {!params.followingId && (
            <Link to={`/account/${params.userId}`} className="btn btn--green new-post-btn edit-btn">
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderProfile;
