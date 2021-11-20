import React from "react";

export const Button = ({ handleClick, text, disabled }) => {
  return (
    <button className="btn" onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};
