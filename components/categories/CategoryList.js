import React from "react";
import { axiosClient } from "../../api/api";
import { CategoryItem } from "./CategoryItem";

export const CategoryList = ({ categorias }) => {
  //Eliminar categoria
  const deleteCategory = async (id) => {
    try {
      const res = await axiosClient.delete(`/categorias/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {categorias.map((categoria) => (
        <CategoryItem
          key={categoria._id}
          {...categoria}
          handleDelete={deleteCategory}
        />
      ))}
    </div>
  );
};
