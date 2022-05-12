import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../../../Utilities/Card/ProfileCard';
import { axiosInstance } from '../../../config';
import './HeroProfile.css';

const HeroProfile = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();

  let accountId = params.userId;
  if (params.followingId) accountId = params.followingId;

  const url = `/api/v1/users/${accountId}/posts`;

  useEffect(async () => {
    try {
      const res = await axiosInstance(url);
      if (res.data.status === 'success') {
        setPosts(res.data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [url, posts]);

  let allPosts = posts.map((post) => (
    <ProfileCard
      key={post._id}
      id={post._id}
      caption={post.caption}
      likes={post.likes}
      comments={post.comments}
      user={post.user}
      createdAt={post.createdAt}
      content={post.content}
    />
  ));

  let errorMsg = '';
  if (allPosts.length === 0)
    errorMsg = (
      <div>
        <p className="empty-post-msg">You haven't posted anything yet.</p>
        <p className="empty-post-msg">What are you waiting for 🙃</p>
      </div>
    );

  return (
    <div className="profile">
      {errorMsg}
      <div className="profile-card-container">{allPosts}</div>
    </div>
  );
};

export default HeroProfile;
