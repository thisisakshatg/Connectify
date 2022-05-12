import React from 'react';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <StickyBox>
      <div className="sidebar-overview">
        <div className="sidebar-element">
          <i className="far fa-bookmark"></i>
          <Link className="sidebar-link" to="#">
            Saved
          </Link>
        </div>
        <div className="sidebar-element">
          <i className="fas fa-suitcase"></i>
          <Link className="sidebar-link" to="#">
            Jobs
          </Link>
        </div>
        <div className="sidebar-element">
          <i className="far fa-clipboard"></i>
          <Link className="sidebar-link" to="#">
            Questions
          </Link>
        </div>
        <div className="sidebar-element">
          <i className="fas fa-rss"></i>
          <Link className="sidebar-link" to="/overview">
            Feed
          </Link>
        </div>
        <div className="sidebar-element">
          <i className="far fa-calendar-check"></i>
          <Link className="sidebar-link" to="#">
            Events
          </Link>
        </div>
        <div className="sidebar-element">
          <i className="fas fa-users"></i>
          <Link className="sidebar-link" to="#">
            Friends
          </Link>
        </div>
      </div>
    </StickyBox>
  );
};

export default Sidebar;
