import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryItem.module.css";
import { DeleteFilled } from "@ant-design/icons";

export const CategoryItem = ({ _id: id, nombre, urlImagen, handleDelete }) => {
  return (
    <Link href={`/categories/${id}`}>
      <a>
        <div className={styles["category-item"]}>
          <Image
            alt={nombre}
            width={150}
            height={120}
            src={`${process.env.imageApi}${urlImagen}`}
          />
          <h3>{nombre}</h3>
          <DeleteFilled
            className={styles.icon}
            onClick={() => handleDelete(id)}
          />
        </div>
      </a>
    </Link>
  );
};
