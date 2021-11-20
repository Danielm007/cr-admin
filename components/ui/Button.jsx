import React from "react";

export const Button = ({
  handleClick,
  text,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className="btn"
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};
