import React, { useContext } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { Context } from "../../context/Context";
import { types } from "../../types/types";
import { CategoryItem } from "./CategoryItem";

export const CategoryList = ({ categorias }) => {
  const { dispatch } = useContext(Context);
  //Eliminar categoria
  const deleteCategory = async (id) => {
    try {
      const { data } = await axiosClient.delete(`/categorias/${id}`);
      if (data.ok) {
        dispatch({ type: types.removeCategory, payload: { id } });
        toast.success(data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div>
      {categorias ? (
        categorias.map((categoria) => (
          <CategoryItem
            key={categoria._id}
            {...categoria}
            handleDelete={deleteCategory}
          />
        ))
      ) : (
        <p>No hay categorías</p>
      )}
    </div>
  );
};
