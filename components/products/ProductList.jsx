import React from "react";
import { ProductItem } from "./ProductItem";
import styles from "./ProductList.module.css";

export const ProductList = ({ productos }) => {
  return (
    <div className={styles["lista-productos"]}>
      {productos.map((producto) => (
        <ProductItem key={producto._id} {...producto} />
      ))}
    </div>
  );
};
