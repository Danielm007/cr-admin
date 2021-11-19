import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { CategoryItem } from "./CategoryItem";

export const CategoryList = ({ categorias }) => {
  const router = useRouter();
  //Eliminar categoria
  const deleteCategory = async (id) => {
    try {
      const res = await axiosClient.delete(`/categorias/${id}`);
      toast.success(res.data.msg);
    } catch (err) {
      console.log(err);
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
