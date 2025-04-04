import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// API for top users
export const getTopUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

// API for trending posts (posts with most comments)
export const getTrendingPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts?type=popular`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};

// API for latest posts feed
export const getLatestPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts?type=latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw error;
  }
}; 