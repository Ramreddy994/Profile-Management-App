import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
