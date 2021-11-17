import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../api/api";
import { loadImage } from "../helpers/loadImage";

export const useCategoryForm = (nombre, id) => {
  //Capturar la imagen
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  //Capturar el nombre
  const [name, setName] = useState(nombre);

  //Manejar cambio
  const handleChange = ({ target }) => {
    setName(target.value);
  };

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
        toast.success(res.data.msg);
        setName("");
        setFileList([]);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const submitEdit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    editCategory();
  };

  const editCategory = async () => {
    if (fileList.length > 0) {
      try {
        const url = await loadImage(fileList[0].originFileObj);
        const body = { nombre: name, url };
        toast.info("Editando Categoría...");
        const res = await axiosClient.put(`/categorias/categoria/${id}`, body);
        if (res.data.ok) {
          router.back();
          toast.success(res.data.msg);
        }
      } catch (err) {
        toast.error(err.reponse.data.msg);
      }
    } else {
      try {
        const body = { nombre: name };
        toast.info("Editando Categoría...");
        const res = await axiosClient.put(`/categorias/categoria/${id}`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.data.ok) {
          router.back();
          toast.success(res.data.msg);
        }
      } catch (err) {
        toast.error(err.reponse.data.msg);
      }
    }
  };

  return { name, handleSubmit, handleChange, onChange, fileList, submitEdit };
};
