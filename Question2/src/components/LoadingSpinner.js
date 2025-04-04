import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 