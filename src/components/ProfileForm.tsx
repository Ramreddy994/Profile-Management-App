import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiBaseUrl from '../config/config';

const ProfileForm: React.FC = () => {
  const { profile, setProfile } = useProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: undefined as number | undefined,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        age: profile.age,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value,
    }));

 
    if (name === 'firstName' || name === 'lastName') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.length < 3 ? 'Must contain at least 3 characters' : '',
      }));
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !emailRegex.test(value) ? 'Invalid email format' : '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.firstName.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'Must contain at least 3 characters',
      }));
      return;
    }
    if (formData.lastName.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: 'Must contain at least 3 characters',
      }));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/profile`, formData);
      setProfile(formData);
      localStorage.setItem('profileData', JSON.stringify(formData));
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div>
      <h2>{profile ? 'Edit' : 'Create'} Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        
        <input
          type="number"
          name="age"
          value={formData.age ?? ''} 
          onChange={handleChange}
          placeholder="Age"
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
