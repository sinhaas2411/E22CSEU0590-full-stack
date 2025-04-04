import React from 'react';

// Generate a random avatar color
const getAvatarBgColor = (id) => {
  const colors = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', 
    '#9b59b6', '#1abc9c', '#d35400', '#c0392b'
  ];
  
  // Use the ID to select a color (ensures same user gets same color)
  const index = parseInt(id) % colors.length;
  return colors[index];
};

const UserCard = ({ user, rank }) => {
  const avatarStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: getAvatarBgColor(user.id),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  };

  return (
    <div className="card">
      <div className="card-body d-flex align-items-center">
        <div style={avatarStyle}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="ms-3">
          <div className="d-flex align-items-center">
            <h5 className="card-title mb-0">{user.name}</h5>
            {rank && <span className="badge bg-primary ms-2">#{rank}</span>}
          </div>
          <p className="card-text mt-1">
            <i className="bi bi-file-text me-1"></i>
            {user.postCount} posts
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 