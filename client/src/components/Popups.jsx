import React from "react";

const Popups = ({alertMessage, style, className}) => {
  return (
    <div className ={className} role="alert" style={style}>
      <strong>{alertMessage}</strong>
    </div>
  );
};

export default Popups;
