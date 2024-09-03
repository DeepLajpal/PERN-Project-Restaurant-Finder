import React from 'react';

const Loader = () => {
  return (
      <div className="spinner-border text-primary" role="status" style={{ position: 'relative', top: '0.5rem' }}>
        <span className="visually-hidden"></span>
    </div>
  );
};

export default Loader;
