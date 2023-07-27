import React from "react";

export default function AlertOnAction({text}) {

  const style={
    position: "fixed",
    top: 25,
    right: 0,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    zIndex:1,
    height:"04rem",
    width:"20rem"
  }
  return (
    
      <div className="toast align-items-center text-bg-success border-0 shadow show" role="alert" style={style
      }>
        <div className="d-flex">
    <div className="toast-body">
      <strong>{text}</strong>
    </div>
  </div>
        
      </div>
    
  );
}
