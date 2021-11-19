import React from "react";
import styles from "./ProductItem.module.css";
import Image from "next/image";
import { DeleteIcon } from "../ui/DeleteIcon";
import Link from "next/link";
import { EditFilled } from "@ant-design/icons";

export const ProductItem = ({
  nombre,
  precio,
  mayorista,
  categoria,
  urlImagen,
  cantidad,
  especial,
}) => {
  return (
    <div className={styles["product-item"]}>
      <Image src={urlImagen} alt={nombre} height={150} width={150} />
      <div>
        <p>{nombre}</p>
        <p>Categoría: {categoria}</p>
        <p>Especial: {especial}</p>
      </div>
      <div>
        <p>Normal: {precio}</p>
        <p>Mayorista: {mayorista}</p>
        <p>Cantidad: {cantidad}</p>
      </div>
      <div className={styles.acciones}>
        <Link href="/">
          <a>
            <EditFilled className={styles.editar} />
          </a>
        </Link>
        <DeleteIcon />
      </div>
    </div>
  );
};
