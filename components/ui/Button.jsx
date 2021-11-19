import React from "react";

export const Button = ({ handleClick, text }) => {
  return (
    <button className="btn" onClick={handleClick}>
      {text}
    </button>
  );
};
