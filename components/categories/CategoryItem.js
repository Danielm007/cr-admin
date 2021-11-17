import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryItem.module.css";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

export const CategoryItem = ({ _id: id, nombre, urlImagen, handleDelete }) => {
  return (
    <div className={styles["category-item"]}>
      <Image alt={nombre} width={150} height={120} src={urlImagen} />
      <h3>{nombre}</h3>
      <div className={styles.actions}>
        <Link href={`/categories/${id}`}>
          <a>
            <EditFilled className={styles.edit} />
          </a>
        </Link>
        <DeleteFilled
          className={styles.icon}
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
};
