import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { profile, setProfile } = useProfile();
  const navigate = useNavigate();

  const handleDeleteProfile = () => {
    const confirmation = window.confirm("Are you sure you want to delete your profile?");
    if (confirmation) {
      setProfile(null); 
      localStorage.removeItem('profileData'); 
      navigate('/profile-form'); 
    }
  };

  if (!profile) {
    return <p>No profile found. Please create one.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      {profile.age !== undefined && <p><strong>Age:</strong> {profile.age}</p>}
      
      <button onClick={handleDeleteProfile} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
        Delete Profile
      </button>
    </div>
  );
};

export default ProfilePage;
