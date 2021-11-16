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
      toast.info("Eliminando la categoría");
      const res = await axiosClient.delete(`/categorias/${id}`);
      if (res.data.ok) {
        router.reload();
      }
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
