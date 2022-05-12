import React from 'react';
import './NewPost.css';
import axios from 'axios';

const NewPost = (props) => {
  return (
    <div className="container new-post-box">
      <div className="login-form new-post-form">
        <button
          className="btn-mobile-nav new-post-box-close-btn"
          onClick={props.newPostOverlayHandler}
        >
          <ion-icon name="close" class="overlay-close"></ion-icon>
        </button>
        <h2 className="heading-secondary heading-login ma-bt-lg">Whats on your mind</h2>
        <form
          className="form form--login"
          id="login-form"
          onSubmit={props.newPostSubmissionHandler}
        >
          <div className="form__group">
            <label className="form__label" htmlFor="caption">
              Caption
            </label>
            <input
              className="form__input"
              id="caption"
              type="text"
              name="caption"
              placeholder="This is an example"
              required="required"
            />
          </div>
          <div className="file-input-box">
            <label className="form__label" htmlFor="content">
              Upload Content
            </label>
            <input
              className="form__upload"
              type="file"
              name="content"
              accept="video/*, image/*"
              id="content"
            />
            <label htmlFor="content" className="form__label fileInput">
              Choose file
            </label>
          </div>
          <div className="form__group">
            <button className="btn btn--green postSubmitBtn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
