import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { profile } = useProfile();

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/profile-form">Profile Form</Link> | <Link to="/profile">Profile</Link>
      </div>
      <div>
        {profile ? (
          <span>Welcome, {profile.firstName} {profile.lastName}</span>
        ) : (
          <span>Welcome, Guest</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
