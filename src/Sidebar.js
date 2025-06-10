import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { ReactComponent as UsersIcon } from './assets/users.svg';
import { ReactComponent as ShuttleIcon } from './assets/shuttle.svg';
import { ReactComponent as ReviewIcon } from './assets/review.svg';
import { ReactComponent as SignOutIcon } from './assets/signout.svg';

function Sidebar({ className = '' }) { //accept className prop so I can dim the side bar if I click the fking modals
  const navigate = useNavigate();
  const handleSignOut = () => {
    // wip
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${className}`.trim()}>
      <div className="sidebar-header">
        <div className='sidebar-app-title'>
          <span style={{ color: '#222222', fontWeight: 700 }}>Shuttle</span>
          <span style={{ color: '#b3e0fc', fontWeight: 700 }}>Sync</span>
        </div>
        <div className="sidebar-title">Admin</div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/user" className="sidebar-link" activeclassname="active">
          <span className="sidebar-icon"><UsersIcon /></span>
          User Management
        </NavLink>
        <NavLink to="/schedule" className="sidebar-link" activeclassname="active">
          <span className="sidebar-icon"><ShuttleIcon /></span>
          Shuttle Schedules
        </NavLink>
        <NavLink to="/review" className="sidebar-link" activeclassname="active">
          <span className="sidebar-icon"><ReviewIcon /></span>
          Feedbacks
        </NavLink>
      </nav>
      <div className="sidebar-footer" onClick={handleSignOut}>
        <span className="sidebar-icon"><SignOutIcon /></span>
        Sign Out
      </div>
    </aside>
  );
}

export default Sidebar;