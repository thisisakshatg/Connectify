import React, { useState } from 'react';
import axios from 'axios';
import './ProfileCard.css';
import { Link, useParams } from 'react-router-dom';
import Overlay from '../Overlay/Overlay';
import Like from '../Likes/Like';
import Comment from '../Comments/Comment';
import NewPost from '../../components/NewPost/NewPost';
import Alert from './../Alert/Alert';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import { axiosInstance } from './../../config';

let status, msg;

const ProfileCard = (props) => {
  const [alert, setAlert] = useState(false);
  const params = useParams();
  const [modalLike, setModalLike] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const check = props.content.split('.')[1];
  const isImg = check === 'jpeg' || check === 'jpg';

  const likeOverlayHandler = () => {
    setModalLike(!modalLike);
  };

  const commentOverlayHandler = () => {
    setModalComment(!modalComment);
  };

  const deleteOverlayHandler = () => {
    setModalDelete(!modalDelete);
  };

  const editOverlayHandler = () => {
    setModalEdit(!modalEdit);
  };

  const deletePostHandler = async () => {
    setIsDeleteLoading(true);
    const res = await axiosInstance.delete(`/api/v1/posts/${props.id}`);
    msg = 'Deletion Successful';
    status = 'success';
    try {
      if (res.data.status === 'success') {
        console.log('success');
      }
    } catch (err) {
      console.log(err);
      status = 'error';
      msg = err.response.data.message;
    } finally {
      setIsDeleteLoading(false);
      if (!alert) setAlert(true);
      else {
        setAlert(false);
        setAlert(true);
      }
    }
  };

  const editPostSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('user', params.userId);
    const content = formData.get('content').name;
    const imgExt = ['jpg', 'jpeg', 'png', 'avif', 'apng', 'pjp', 'webp', 'svg', 'bmp'];
    const ext = content.split('.')[1];

    let url;
    if (imgExt.includes(ext)) url = `/api/v1/posts/${props.id}/update/contentImage`;
    else url = `/api/v1/posts/${props.id}/update/contentVideo`;

    try {
      const res = await axiosInstance({
        method: 'PATCH',
        url: url,
        data: formData,
      });
      if (res.data.status === 'success') {
        console.log('Post updated successfully!!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const allLikes = props.likes.map((like) => <Like key={like._id} user={like.user} />);
  const allComments = props.comments.map((comment) => (
    <Comment key={comment._id} user={comment.user} caption={comment.caption} />
  ));

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
              <h2 className="heading-secondary">Comments</h2>
              <div>{allComments}</div>
            </div>
            <button className="btn-mobile-nav" onClick={commentOverlayHandler}>
              <ion-icon name="close" class="overlay-close"></ion-icon>
            </button>
          </div>
        </Overlay>
      )}

      {modalDelete && (
        <Overlay>
          <div className="all-like-box delete-box">
            <div className="deletePostContainer">
              <div className="delete-style-box">
                <div className="trash-icon-box">
                  <i class="fas fa-trash"></i>
                </div>
                <span className="delete-warning">
                  You are about to delete a post. Are you sure?
                </span>
              </div>
              <div className="delete-modal-btn-box">
                <button onClick={deleteOverlayHandler} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={deletePostHandler} className="cancel-btn delete-btn">
                  Confirm
                </button>
              </div>
            </div>
            <button className="btn-mobile-nav" onClick={deleteOverlayHandler}>
              <ion-icon name="close" class="overlay-close"></ion-icon>
            </button>
          </div>
        </Overlay>
      )}

      {modalEdit && (
        <Overlay>
          <NewPost
            newPostSubmissionHandler={editPostSubmitHandler}
            newPostOverlayHandler={editOverlayHandler}
          />
        </Overlay>
      )}

      {isDeleteLoading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}

      {alert && <Alert msg={msg} type={status} />}

      <div className="card-container">
        <div className="profile-card">
          <div className="card__header">
            <div className="profile-card-picture">
              {isImg && (
                <img
                  src={process.env.PUBLIC_URL + '/content/imgs/' + props.content}
                  alt="Tour 1"
                  className="profile-card__picture-img"
                />
              )}
              {!isImg && (
                <video className="profile-bg-video__content" autoplay="" muted="muted" loop={true}>
                  <source
                    src={process.env.PUBLIC_URL + '/content/videos/' + props.content}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
          </div>
          <div className="card__details">
            <h4 className="profile-card__sub-heading">10 minutes ago</h4>
            <p className="card__text">{props.caption}</p>
            <div className="card__data">
              <i class="far fa-heart"></i>
              <Link className="nav__el actionOverlayBtn" to="#" onClick={likeOverlayHandler}>
                {props.likes.length} Likes
              </Link>
            </div>
            <div className="card__data">
              <i class="far fa-comment"></i>
              <Link className="nav__el actionOverlayBtn" to="#" onClick={commentOverlayHandler}>
                {props.comments.length} Comments
              </Link>
            </div>
          </div>

          <div className="profile-card__footer">
            {!params.followingId && (
              <button className="btn edit-post-btn" onClick={editOverlayHandler}>
                Edit
              </button>
            )}
            {!params.followingId && (
              <button className="btn delete-post-btn" onClick={deleteOverlayHandler}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
