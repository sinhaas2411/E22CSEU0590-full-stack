import React, { useState, useEffect } from 'react';
import { getTrendingPosts } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const response = await getTrendingPosts();
        setPosts(response.posts || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching trending posts:', err);
        setError('Failed to load trending posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No trending posts found.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Trending Posts</h2>
          <div className="card mb-4">
            <div className="card-body">
              <p className="lead">
                These are the most engaged posts on our platform, ranked by number of comments they've received.
              </p>
              {posts.length > 0 && (
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Currently showing {posts.length} post{posts.length !== 1 ? 's' : ''} with {posts[0].commentCount} comments each.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {posts.map(post => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts; 