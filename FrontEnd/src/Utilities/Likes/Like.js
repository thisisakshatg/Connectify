import React from 'react';
import { Link } from 'react-router-dom';
import './Like.css';
import { useParams } from 'react-router-dom';

const Like = (props) => {
  const params = useParams();

  return (
    <div className="like-container">
      <img
        src={process.env.PUBLIC_URL + '/content/imgs/' + props.user.photo}
        className="like-img"
      />
      <Link to={`/profile/${params.userId}/${props.user._id}`} className="like-name overview-link">
        {props.user.name}
      </Link>
    </div>
  );
};

export default Like;
