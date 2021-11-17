import React from "react";
import styles from "./CategoryForm.module.css";
import { ImagePicker } from "../images/ImagePicker";
import { BackButton } from "../ui/BackButton";
import { useCategoryForm } from "../../hooks/useCategoryForm";
import Image from "next/image";

export const CategoryForm = ({ category }) => {
  const nombre = category ? category.nombre : "";
  const id = category ? category._id : "";
  //Custom Hook
  const { name, submitEdit, handleSubmit, handleChange, onChange, fileList } =
    useCategoryForm(nombre, id);

  return (
    <>
      <BackButton />
      <form
        className={styles.form}
        onSubmit={category ? submitEdit : handleSubmit}
      >
        <fieldset>
          <legend>{category ? "Editar Categoría" : "Agregar Categoría"}</legend>
          <div className={styles["form-control"]}>
            <label htmlFor="name">Nombre de la categoría</label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              value={name}
              autoComplete="off"
            />
          </div>

          {category && fileList.length === 0 && (
            <div>
              <p>Imagen actual</p>
              <Image src={category.urlImagen} width={150} height={150} />
            </div>
          )}
          <label>{category ? "Editar Imagen" : "Agregar Imagen"}</label>
          <ImagePicker onChange={onChange} fileList={fileList} />
          <button className="btn">Guardar</button>
        </fieldset>
      </form>
    </>
  );
};
