import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Card.css';
import Overlay from '../Overlay/Overlay';
import Comment from '../Comments/Comment';
import Like from '../Likes/Like';
import { axiosInstance } from '../../config';

const dateConverter = (postingDate) => {
  const today = Date.now();
  const diffMs = today - postingDate; //ms
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffWeeks / 4);
  const diffYears = Math.floor(diffMonths / 12);
  let finalDiff = '';

  if (diffMins === 0) finalDiff = `${diffSecs} seconds ago`;
  else if (diffHrs === 0) finalDiff = `${diffMins} minutes ago`;
  else if (diffDays === 0) finalDiff = `${diffHrs} hours ago`;
  else if (diffWeeks === 0) finalDiff = `${diffDays} days ago`;
  else if (diffMonths === 0) finalDiff = `${diffWeeks} weeks ago`;
  else if (diffYears === 0) finalDiff = `${diffMonths} months ago`;
  else finalDiff = '10 minutes ago';

  return finalDiff;
};

let firstLoad = true;

const Card = (props) => {
  const commentInputRef = useRef();
  const params = useParams();
  let [postLikes, setPostLikes] = useState(props.likes);
  let [postComments, setPostComments] = useState(props.comments);

  const likeUserId = props.likes.map((like) => like.user._id);

  const likedInitial = likeUserId.includes(params.userId) ? true : false;

  const [modalLike, setModalLike] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [commented, setCommented] = useState(false);
  const [submitState, setSubmitState] = useState(false);

  const [liked, setLiked] = useState(likedInitial);
  const isImg = props.content.split('.')[1] === 'jpeg' || props.content.split('.')[1] === 'jpg';

  const likeOverlayHandler = () => {
    setModalLike(!modalLike);
  };

  const commentOverlayHandler = () => {
    setModalComment(!modalComment);
  };

  const submitHandler = async () => {
    const caption = commentInputRef.current.value;
    try {
      if (commented) {
        console.log('Inside commented');
        const commentsUrl = `/api/v1/comments`;
        const res = await axiosInstance.post(commentsUrl, {
          caption: caption,
          user: params.userId,
        });
        if (res.data.status === 'success') {
          const doc = res.data.data.doc;
          doc.user = {
            _id: doc.user,
            name: props.loggedInUser.name,
            photo: props.loggedInUser.photo,
          };
          postComments.push(doc);
          console.log(postComments);
        }
      } else {
        const filteredComments = postComments.filter((doc) => doc.user._id !== params.userId);
        postComments = filteredComments;
      }
      const result = await axiosInstance.patch(`/api/v1/posts/${props.id}`, {
        comments: postComments,
      });
      if (result.data.status === 'success') {
        setCommented(!commented);
        setSubmitState(!submitState);
        setPostComments(postComments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postLikeHandler = async () => {
    firstLoad = false;
    try {
      if (!liked) {
        const likesUrl = `/api/v1/likes`;
        const res = await axiosInstance.post(likesUrl, { user: params.userId });
        if (res.data.status === 'success') {
          const doc = res.data.data.doc;
          doc.user = {
            _id: doc.user,
            name: props.loggedInUser.name,
            photo: props.loggedInUser.photo,
          };
          postLikes.push(doc);
        }
      } else {
        const filteredLikes = postLikes.filter((doc) => doc.user._id !== params.userId);
        postLikes = filteredLikes;
      }
      console.log(postLikes);
      const result = await axiosInstance.patch(`/api/v1/posts/${props.id}`, {
        likes: postLikes,
      });
      if (result.data.status === 'success') {
        setLiked((prevLike) => !prevLike);
        setPostLikes(postLikes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const commentHandler = () => {
    setCommented(!commented);
  };

  const commentInputHandler = () => {
    setSubmitState(true);
  };

  const allLikes = postLikes.map((like) => <Like key={like._id} user={like.user} />);
  const allComments = postComments.map((comment) => (
    <Comment key={comment._id} user={comment.user} caption={comment.caption} />
  ));

  const heartClass = !firstLoad ? 'fa-heart fa-4x fa-beat' : 'fa-heart fa-4x';

  return (
    <div>
      {modalLike && (
        <Overlay>
          <div className="all-like-box">
            <div>
              <h2 className="heading-secondary">Likes</h2>
              <div>{allLikes}</div>
            </div>
            <button className="btn-mobile-nav" onClick={likeOverlayHandler}>
              <ion-icon name="close" class="overlay-close"></ion-icon>
            </button>
          </div>
        </Overlay>
      )}

      {modalComment && (
        <Overlay>
          <div className="all-like-box">
            <div>
              <h2 className="heading-secondary heading-comments">Comments</h2>
              <div className="comment-submit-box">
                {!commented && (
                  <button onClick={commentHandler} className="commentSubmitBtn btn--green">
                    Add a Comment
                  </button>
                )}
                {commented && (
                  <input
                    type="text"
                    onChange={commentInputHandler}
                    ref={commentInputRef}
                    className="form__input commentInput"
                    required="required"
                    minLength="1"
                  />
                )}
                <button
                  onClick={submitHandler}
                  disabled={!submitState}
                  className="commentSubmitBtn btn--green"
                >
                  Submit
                </button>
              </div>
              <div>{allComments}</div>
            </div>
            <button className="btn-mobile-nav" onClick={commentOverlayHandler}>
              <ion-icon name="close" class="overlay-close"></ion-icon>
            </button>
          </div>
        </Overlay>
      )}

      <div className="card-container">
        <div className="post">
          <div className="post-username-box">
            <img
              src={process.env.PUBLIC_URL + '/content/imgs/' + props.user.photo}
              alt="User profile photo"
              className="post-userimg"
            />
            <Link
              to={`/profile/${props.accountId}/${props.user._id}`}
              className="overview-link post-username "
            >
              {props.user.name}
            </Link>
          </div>
          <div className="card">
            <div className="card__header">
              <div className="card__picture">
                {isImg && (
                  <img
                    src={process.env.PUBLIC_URL + '/content/imgs/' + props.content}
                    alt="Tour 1"
                    className="card__picture-img"
                  />
                )}
                {!isImg && (
                  <video autoplay="" muted="muted" loop={true} className="bg-video__content">
                    <source
                      src={process.env.PUBLIC_URL + '/content/videos/' + props.content}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
            </div>

            <div className="card__details">
              <h4 className="card__sub-heading">{dateConverter(props.createdAt)}</h4>
              <p className="card__text">{props.caption}</p>
              <div className="card__data">
                <button className="btn-mobile-nav" onDoubleClick={postLikeHandler}>
                  {!liked && <i class={`far ${heartClass}`}></i>}
                  {liked && <i class={`fas ${heartClass}`}></i>}
                </button>
                <Link className="nav__el actionOverlayBtn" to="#" onClick={likeOverlayHandler}>
                  {postLikes.length} Likes
                </Link>
              </div>
              <div className="card__data">
                <i class="far fa-comment"></i>
                <Link className="nav__el actionOverlayBtn" to="#" onClick={commentOverlayHandler}>
                  {postComments.length} Comments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
