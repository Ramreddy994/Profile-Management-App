import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;


export const useProfileApi = () => {
  const createOrUpdateProfile = async (data: any) => {
    try {
      const response = await axios.post(`${apiUrl}/profile`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to save profile.');
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${apiUrl}/profile`);
      return response.data;
    } catch (error) {
      throw new Error('Profile not found.');
    }
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(`${apiUrl}/profile`);
    } catch (error) {
      throw new Error('Failed to delete profile.');
    }
  };

  return { createOrUpdateProfile, getProfile, deleteProfile };
};
