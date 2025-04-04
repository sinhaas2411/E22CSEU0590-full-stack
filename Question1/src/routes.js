const express = require('express');
const router = express.Router();
const { getTopUsers, getPosts } = require('./controllers');

// Get top 5 users with most posts
router.get('/users', getTopUsers);

// Get posts based on type (popular or latest)
router.get('/posts', getPosts);

module.exports = router; 