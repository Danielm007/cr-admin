import { StarFilled } from "@ant-design/icons";
import React from "react";
import styles from "./FavoriteIcon.module.css";

export const FavoriteIcon = ({ handleClick, favorite }) => {
  return (
    <StarFilled
      className={styles.star}
      style={favorite ? { color: "#f2c107" } : { color: "black" }}
      onClick={handleClick}
    />
  );
};
