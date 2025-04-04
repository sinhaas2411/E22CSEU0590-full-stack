import React from 'react';

// Generate a random image URL
const getRandomImageUrl = (postId) => {
  // Use post ID to ensure same post gets same image
  const imageId = parseInt(postId) % 1000;
  return `https://picsum.photos/seed/${imageId}/400/300`;
};

// Generate a random color for user avatar
const getAvatarBgColor = (userId) => {
  const colors = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', 
    '#9b59b6', '#1abc9c', '#d35400', '#c0392b'
  ];
  
  const index = parseInt(userId) % colors.length;
  return colors[index];
};

const PostCard = ({ post }) => {
  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: getAvatarBgColor(post.userid),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold'
  };

  return (
    <div className="card mb-4">
      <img 
        src={getRandomImageUrl(post.id)} 
        className="card-img-top" 
        alt={post.content}
      />
      <div className="card-body">
        <h5 className="card-title">{post.content}</h5>
        <div className="d-flex align-items-center mt-3">
          <div style={avatarStyle}>
            {post.userName ? post.userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="ms-2">
            <p className="mb-0 fw-bold">{post.userName}</p>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted d-flex justify-content-between">
        <div>
          <i className="bi bi-chat-left-text me-1"></i>
          {post.commentCount || 0} comments
        </div>
        <div>
          <small>Post #{post.id}</small>
        </div>
      </div>
    </div>
  );
};

export default PostCard; 