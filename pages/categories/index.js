import React, { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../api/api";
import { CategoryList } from "../../components/categories/CategoryList";
import { BackButton } from "../../components/ui/BackButton";
import { LoadingScreen } from "../../components/ui/LoadingScreen";
import { Context } from "../../context/Context";
import { Check } from "../../helpers/check";
import { types } from "../../types/types";

const Categories = () => {
  //Context
  const {
    state: { categories },
    dispatch,
  } = useContext(Context);

  //Estados de la aplicacion
  const [loading, setLoading] = useState(true);
  //Check
  Check();
  useEffect(() => {
    loadCategories();
  }, []);

  //Recuperar categorias
  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/categorias");
      const { categorias } = res.data;
      dispatch({ type: types.loadCategories, payload: categorias });
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
          <CategoryList categorias={categories} />
        </>
      )}
    </>
  );
};

export default Categories;
