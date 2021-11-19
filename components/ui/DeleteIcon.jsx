import { DeleteFilled } from "@ant-design/icons";
import React from "react";
import styles from "./Delete.module.css";

export const DeleteIcon = ({ onClick }) => {
  return <DeleteFilled className={styles.delete} onClick={onClick} />;
};
