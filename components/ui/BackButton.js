import React from "react";
import styles from "./BackButton.module.css";
import { useRouter } from "next/router";
import { SwapLeftOutlined } from "@ant-design/icons";

export const BackButton = () => {
  const router = useRouter();
  return (
    <button className={styles.btn} onClick={() => router.back()}>
      <SwapLeftOutlined /> Regresar
    </button>
  );
};
