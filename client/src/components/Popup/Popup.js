import React from "react";

const Popup = ({ title, color }) => {
  return (
    <div className="popup" style={{ backgroundColor: color }}>
      <h4>{title}</h4>
    </div>
  );
};

export default Popup;
