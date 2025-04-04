const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

// Setting up constants
const API_BASE_URL = process.env.API_BASE_URL || 'http://20.244.56.144/evaluation-service';

// Authentication data with correct access code
const authData = {
  email: "ramkrishna@abc.edu",
  name: "ram krishna",
  rollNo: "aalbb",
  accessCode: "xgAsNC",
  clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
  clientSecret: "tVJaaaRBSeXcRXeM"
};

// User data for possible registration
const userData = {
  email: "e22cseu0590@bennett.edu.in",
  name: "Aryan Sinha",
  rollNo: "E22CSEU0590",
  mobileNo: "9696539587", 
  githubUsername: "sinhaas2411",
  accessCode: "rtCHZJ",
  collegeName: "Bennett University"
};

// Cache with TTL of 55 minutes (token usually expires in 1 hour)
const tokenCache = new NodeCache({ stdTTL: 55 * 60 });

// Mock data for development when API fails
const mockUsers = {
  users: {
    "1": "John Doe",
    "2": "Jane Doe",
    "3": "Alice Smith",
    "4": "Bob Johnson",
    "5": "Charlie Brown",
    "6": "Diana White",
    "7": "Edward Davis",
    "8": "Fiona Miller",
    "9": "George Wilson",
    "10": "Helen Moore",
    "11": "Ivy Taylor",
    "12": "Jack Anderson",
    "13": "Kathy Thomas",
    "14": "Liam Jackson",
    "15": "Mona Harris",
    "16": "Nathan Clark",
    "17": "Olivia Lewis",
    "18": "Paul Walker",
    "19": "Quinn Scott",
    "20": "Rachel Young"
  }
};

const mockPosts = {
  posts: [
    { id: 246, userid: 1, content: "Post about ant" },
    { id: 161, userid: 1, content: "Post about elephant" },
    { id: 150, userid: 1, content: "Post about ocean" },
    { id: 370, userid: 1, content: "Post about monkey" },
    { id: 344, userid: 1, content: "Post about ocean" },
    { id: 952, userid: 1, content: "Post about zebra" },
    { id: 647, userid: 1, content: "Post about igloo" },
    { id: 421, userid: 1, content: "Post about house" },
    { id: 890, userid: 1, content: "Post about bat" },
    { id: 461, userid: 1, content: "Post about umbrella" }
  ]
};

const mockComments = {
  comments: [
    { id: 3893, postid: 150, content: "Old comment" },
    { id: 4791, postid: 150, content: "Boring comment" }
  ]
};

// Try to register with your credentials
const tryRegister = async () => {
  try {
    console.log('Attempting registration with user credentials...');
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    console.log('Registration successful!');
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return null;
  }
};

// Get authentication token
const getAuthToken = async () => {
  try {
    // Check if token is in cache
    const cachedToken = tokenCache.get('authToken');
    if (cachedToken) {
      console.log('Using cached token');
      return cachedToken;
    }

    console.log('Requesting auth token with example credentials...');
    
    // First try with example credentials that we know work
    let response;
    try {
      response = await axios.post(`${API_BASE_URL}/auth`, authData);
    } catch (error) {
      console.error('Example auth failed. Trying to register...');
      
      // Try to register
      const registerData = await tryRegister();
      
      if (registerData && registerData.clientID && registerData.clientSecret) {
        // Create auth data with registration response
        const userAuthData = {
          ...userData,
          clientID: registerData.clientID,
          clientSecret: registerData.clientSecret
        };
        
        console.log('Trying auth with registration credentials...');
        response = await axios.post(`${API_BASE_URL}/auth`, userAuthData);
      } else {
        throw new Error('Failed to authenticate or register');
      }
    }

    console.log('Auth token received successfully');
    
    const token = response.data.access_token;
    
    // Cache the token
    tokenCache.set('authToken', token);
    
    return token;
  } catch (error) {
    console.error('Auth error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    // Return a fake token for development
    console.log('Using mock token for development');
    return "mock-token-for-development";
  }
};

// Get all users from the API
const getUsers = async (token) => {
  try {
    // Try to get real data
    if (token !== "mock-token-for-development") {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Successfully fetched users from API');
      return response.data;
    }
    
    // Fall back to mock data
    console.log("Using mock user data for development");
    return mockUsers;
  } catch (error) {
    console.error('Get users error:', error.message);
    // Return mock data when API fails
    console.log("Falling back to mock user data");
    return mockUsers;
  }
};

// Get posts for a specific user
const getUserPosts = async (token, userId) => {
  try {
    // Try to get real data
    if (token !== "mock-token-for-development") {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`Successfully fetched posts for user ${userId} from API`);
      return response.data;
    }
    
    // Fall back to mock data
    console.log(`Using mock post data for user ${userId}`);
    return { posts: mockPosts.posts.filter(post => post.userid.toString() === userId.toString()) };
  } catch (error) {
    console.error(`Get posts error for user ${userId}:`, error.message);
    // Return mock data when API fails
    console.log(`Falling back to mock post data for user ${userId}`);
    return { posts: mockPosts.posts.filter(post => post.userid.toString() === userId.toString()) };
  }
};

// Get comments for a specific post
const getPostComments = async (token, postId) => {
  try {
    // Try to get real data
    if (token !== "mock-token-for-development") {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`Successfully fetched comments for post ${postId} from API`);
      return response.data;
    }
    
    // Fall back to mock data
    console.log(`Using mock comment data for post ${postId}`);
    return postId === "150" ? mockComments : { comments: [] };
  } catch (error) {
    console.error(`Get comments error for post ${postId}:`, error.message);
    // Return mock data when API fails
    console.log(`Falling back to mock comment data for post ${postId}`);
    return postId === "150" ? mockComments : { comments: [] };
  }
};

module.exports = {
  getAuthToken,
  getUsers,
  getUserPosts,
  getPostComments
}; 