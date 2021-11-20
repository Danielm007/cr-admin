import React, { useContext } from "react";
import styles from "./ProductItem.module.css";
import Image from "next/image";
import { DeleteIcon } from "../ui/DeleteIcon";
import Link from "next/link";
import { EditFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { Context } from "../../context/Context";
import { types } from "../../types/types";

export const ProductItem = ({
  nombre,
  precio,
  mayorista,
  categoria,
  urlImagen,
  cantidad,
  especial,
  _id: id,
}) => {
  //ContextAPI
  const { dispatch } = useContext(Context);

  //handleDelete
  const handleDelete = async (id) => {
    toast.info("Eliminando producto...");
    try {
      const { data } = await axiosClient.delete(`/productos/producto/${id}`);
      if (data.ok) {
        toast.success(data.msg);
      }
      dispatch({ type: types.removeProduct, payload: { id } });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

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
        <DeleteIcon onClick={() => handleDelete(id)} />
      </div>
    </div>
  );
};
