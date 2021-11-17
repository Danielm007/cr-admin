import React, { useEffect, useState } from "react";
import { axiosClient } from "../../api/api";
import { CategoryList } from "../../components/categories/CategoryList";
import { BackButton } from "../../components/ui/BackButton";
import { LoadingScreen } from "../../components/ui/LoadingScreen";

const Categories = () => {
  //Estados de la aplicacion
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadCategories();
  }, []);

  //Recuperar categorias
  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/categorias");
      const { categorias } = res.data;
      setCategorias(categorias);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <BackButton />
          <CategoryList categorias={categorias} />
        </>
      )}
    </>
  );
};

export default Categories;
