import React from "react";
import styles from "./LoadingScreen.module.css";

export const LoadingScreen = () => {
  return (
    <>
      <div className="center">
        <div className={`${styles["lds-ring"]}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <p className={`center ${styles.loading}`}>Cargando</p>
    </>
  );
};
