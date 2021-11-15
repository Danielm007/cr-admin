import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/api";
import { CategoryList } from "../../components/categories/CategoryList";

const Categories = () => {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    loadCategories();
  }, []);

  //Recuperar categorias
  const loadCategories = async () => {
    try {
      const res = await axiosClient.get("/categorias");
      const { categorias } = res.data;
      setCategorias(categorias);
    } catch (err) {
      console.log(err);
    }
  };

  return <CategoryList categorias={categorias} />;
};

export default Categories;
