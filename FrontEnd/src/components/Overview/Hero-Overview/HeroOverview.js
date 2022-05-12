import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../../config';
import Card from '../../../Utilities/Card/Card';
import Sidebar from '../../../Utilities/Sidebar/Sidebar';
import './HeroOverview.css';

let user = {};

const HeroOverview = () => {
  const [followingPost, setFollowingPost] = useState([]);
  const params = useParams();
  const urlUser = `/api/v1/users/${params.userId}`;

  useEffect(async () => {
    try {
      const res = await axiosInstance(urlUser);
      if (res.data.status === 'success') {
        user = res.data.data.data;
        const following = user.following;
        let posts = [];

        for (const personId in following) {
          const urlPost = `/api/v1/users/${following[personId]}/posts`;
          const result = await axiosInstance(urlPost);
          if (result.data.status === 'success') {
            const currFollowingPost = result.data.data.data;
            posts = [...posts, ...currFollowingPost];
          }
        }
        setFollowingPost(posts);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  let allOverviewPosts = followingPost.map((post) => (
    <Card
      key={post._id}
      id={post._id}
      caption={post.caption}
      likes={post.likes}
      comments={post.comments}
      accountId={params.userId}
      user={post.user}
      createdAt={post.createdAt}
      content={post.content}
      loggedInUser={user}
    />
  ));

  let errorMsg = '';
  if (allOverviewPosts.length === 0)
    errorMsg = (
      <div className="error-box">
        <p className="empty-post-msg">You don't follow anyone 😟</p>
        <p className="empty-post-msg">Follow friends to see their updates!!</p>
      </div>
    );

  return (
    <div className="hero-overview-container">
      <Sidebar />
      <div>{allOverviewPosts}</div>
      {errorMsg}
    </div>
  );
};

export default HeroOverview;
