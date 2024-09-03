import React from 'react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'transparent', height: '20vh', width:'90vw'}}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Loader;
