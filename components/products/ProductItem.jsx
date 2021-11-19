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
      <div>
        <Image src={urlImagen} alt={nombre} height={150} width={150} />
      </div>
      <div>
        <p className="negrita">{nombre}</p>
        <p>Categoría: {categoria}</p>
        <p>Especial: ${parseFloat(especial).toFixed(2)}</p>
      </div>
      <div>
        <p>Normal: ${parseFloat(precio).toFixed(2)}</p>
        <p>Mayorista: ${parseFloat(mayorista).toFixed(2)}</p>
        <p>Disponibles: {cantidad}</p>
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
