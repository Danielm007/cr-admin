import React, { useState } from "react";
import styles from "./CategoryForm.module.css";
import { ImagePicker } from "../images/ImagePicker";
import { BackButton } from "../ui/BackButton";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { loadImage } from "../../helpers/loadImage";
import axios from "axios";

export const CategoryForm = () => {
  //Capturar la imagen
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  //Capturar el nombre
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion
    if (name.trim() === "") {
      toast.error("El nombre no puede estar vacío");
      return;
    }
    //Validate Images
    if (fileList.length === 0) {
      toast.error("Asegúrate de adjuntar una imagen");
      return;
    }

    //Mandar peticion
    saveNewCategory();
  };

  const saveNewCategory = async () => {
    try {
      //Obtenemos la url mandando a una api
      const url = await loadImage(fileList[0].originFileObj);
      toast.info("Guardando la nueva categoría...");
      const body = { nombre: name, url };
      const res = await axiosClient.post("/categorias/new", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.ok) {
        toast.success("Categoría guardada");
        setName("");
        setFileList([]);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message.msg);
    }
  };

  return (
    <>
      <BackButton />
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Agregar Categoría</legend>
          <div className={styles["form-control"]}>
            <label htmlFor="name">Nombre de la categoría</label>
            <input
              onChange={({ target }) => setName(target.value)}
              type="text"
              id="name"
              value={name}
              autoComplete="off"
            />
          </div>
          <label>Agregar Imagen</label>
          <ImagePicker onChange={onChange} fileList={fileList} />
          <button className="btn">Guardar</button>
        </fieldset>
      </form>
    </>
  );
};
