import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { loadImage } from "../../helpers/loadImage";
import { useForm } from "../../hooks/useForm";
import { ImagePicker } from "../images/ImagePicker";
import { Button } from "../ui/Button";
import { LoadingScreen } from "../ui/LoadingScreen";
import Image from "next/image";

export const ProductForm = ({ producto }) => {
  const router = useRouter();

  //useForm custom hook
  const { formValues, handleInputChange, reset } = useForm({
    nombre: producto ? producto.nombre : "",
    precio: producto ? producto.precio : 0,
    especial: producto ? producto.especial : 0,
    mayorista: producto ? producto.mayorista : 0,
    cantidad: producto ? producto.cantidad : 0,
    categoria: producto ? producto.categoria : "",
  });

  //useState
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //Object Destructuring
  const { nombre, precio, especial, mayorista, cantidad, categoria } =
    formValues;

  //onChange
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  //Handle Image Change
  const [fileList, setFileList] = useState([]);

  //loadCategories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get("/categorias");
      if (data.ok) {
        setCategories(data.categorias);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
      toast.error(err.response.data.msg);
    }
  };

  //handleSubmit add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    //Validation All fields have to be filled
    if (nombre.trim() === "" || nombre.trim().length < 3) {
      toast.error("El nombre debe tener como mínimo 3 caracteres");
      return;
    }
    if (precio <= 0 || especial <= 0 || mayorista <= 0) {
      toast.error("Los precios no pueden ser 0");
      return;
    }
    if (cantidad <= 0) {
      toast.error("La cantidad debe ser mínimo de 1");
      return;
    }
    if (categoria.trim() === "") {
      toast.error("Debes elegir una categoría");
      return;
    }
    if (fileList.length === 0) {
      toast.error("Debes proveer una imagen");
      return;
    }

    toast.info("Guardando el proyecto...");
    try {
      const url = await loadImage(fileList[0].originFileObj);
      const body = {
        nombre,
        precio,
        urlImagen: url,
        mayorista,
        especial,
        categoria,
        cantidad,
      };
      const { data } = await axiosClient.post("/productos/new", body);
      if (data.ok) {
        toast.success(data.msg);
        //Reset form values
        reset();
        //reset Image Picker
        setFileList([]);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //HandleSubmit edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    //Validation All fields have to be filled
    if (nombre.trim() === "" || nombre.trim().length < 3) {
      toast.error("El nombre debe tener como mínimo 3 caracteres");
      return;
    }
    if (precio <= 0 || especial <= 0 || mayorista <= 0) {
      toast.error("Los precios no pueden ser 0");
      return;
    }
    if (cantidad <= 0) {
      toast.error("La cantidad debe ser mínimo de 1");
      return;
    }
    if (categoria.trim() === "") {
      toast.error("Debes elegir una categoría");
      return;
    }

    toast.info("Editando el producto...");
    try {
      const urlImagen =
        fileList.length > 0 ? await loadImage(fileList[0].originFileObj) : null;
      const body = {
        nombre,
        precio,
        especial,
        mayorista,
        urlImagen,
        cantidad,
        categoria,
      };
      console.log("Mandando peticion", urlImagen);
      const { data } = await axiosClient.put(
        `/productos/producto/${producto._id}`,
        body
      );
      if (data.ok) {
        toast.success(data.msg);
        router.replace("/products");
      }
    } catch (err) {
      toast.error(err.response);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <form
          className="form"
          onSubmit={producto ? handleEditProduct : handleAddProduct}
        >
          <fieldset>
            <legend>
              {producto ? "Editar Producto" : "Agregar Nuevo Producto"}
            </legend>
            <div className="form-control">
              <label htmlFor="nombre">Nombre</label>
              <input
                onChange={handleInputChange}
                name="nombre"
                type="text"
                id="nombre"
                placeholder="Nombre del producto"
                value={nombre}
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label htmlFor="precio">Precio Normal</label>
              <input
                onChange={handleInputChange}
                name="precio"
                id="precio"
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio normal"
                value={precio}
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label htmlFor="especial">Precio Especial</label>
              <input
                onChange={handleInputChange}
                name="especial"
                id="especial"
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio Cristo Rey"
                value={especial}
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label htmlFor="mayorista">Precio Mayorista</label>
              <input
                onChange={handleInputChange}
                name="mayorista"
                id="mayorista"
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio Mayorista"
                value={mayorista}
                autoComplete="off"
              />
            </div>
            <div className="form-control">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                onChange={handleInputChange}
                name="cantidad"
                id="cantidad"
                type="number"
                min="0"
                step="1"
                placeholder="Cantidad Disponible"
                value={cantidad}
                autoComplete="off"
              />
            </div>

            <div className="form-control">
              <label htmlFor="categoria">Categoría</label>
              <select
                name="categoria"
                onChange={handleInputChange}
                id="categoria"
                value={categoria}
              >
                <option value="" disabled>
                  - Elige una categoría -
                </option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {producto && fileList.length === 0 && (
              <Fragment>
                <div>
                  <p>Imagen Actual</p>
                  <Image
                    src={producto.urlImagen}
                    width={150}
                    height={150}
                    alt={producto.nombre}
                  />
                </div>
              </Fragment>
            )}

            <p className="mt-20">
              {producto ? "Editar Imagen" : "Agregar Imagen"}
            </p>
            <ImagePicker fileList={fileList} onChange={onChange} />

            <Button
              type="submit"
              text={producto ? "Editar Producto" : "Agregar Producto"}
            />
          </fieldset>
        </form>
      )}
    </>
  );
};
