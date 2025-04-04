import React, { useState, useEffect } from 'react';
import { getTopUsers } from '../services/api';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await getTopUsers();
        setUsers(response.users || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching top users:', err);
        setError('Failed to load top users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
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

  if (users.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No users found.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Top Users with Most Posts</h2>
          <div className="card mb-4">
            <div className="card-body">
              <p className="lead">
                These users are the most active content creators on our platform, 
                ranked by the number of posts they've shared.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {users.map((user, index) => (
          <div className="col-md-6 col-lg-4" key={user.id}>
            <UserCard user={user} rank={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsers; 