import React from 'react';
import './Comment.css';
import { Link, useParams } from 'react-router-dom';

const Comment = (props) => {
  const params = useParams();

  return (
    <div className="comment-container">
      <img
        src={process.env.PUBLIC_URL + '/content/imgs/' + props.user.photo}
        className="comment-img"
      />
      <div>
        <Link to={`/profile/${params.userId}/${props.user._id}`} className="comment-name">
          {props.user.name}
        </Link>
        <span className="comment-caption">{props.caption}</span>
      </div>
    </div>
  );
};

export default Comment;
