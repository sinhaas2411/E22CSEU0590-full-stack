import React, { useState, useEffect } from 'react';
import { getLatestPosts } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch latest posts
  const fetchLatestPosts = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const response = await getLatestPosts();
      setPosts(response.posts || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching latest posts:', err);
      setError('Failed to load latest posts. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLatestPosts();
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestPosts(true);
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual refresh handler
  const handleRefresh = () => {
    fetchLatestPosts(true);
  };

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Latest Posts</h2>
            <button 
              className="btn btn-primary" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Refreshing...
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  Refresh
                </>
              )}
            </button>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <p className="lead">
                This feed shows the 5 most recent posts from our platform. It automatically updates every 10 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {posts.length === 0 && !loading ? (
        <div className="alert alert-info" role="alert">
          No posts found.
        </div>
      ) : (
        <div className="row">
          {posts.map(post => (
            <div className="col-md-6 col-lg-4" key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed; 