import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { BackButton } from "../ui/BackButton";
import { LoadingScreen } from "../ui/LoadingScreen";
import { ProductList } from "./ProductList";
import { SearchBar } from "./SearchBar";

export const ProductContainer = () => {
  const [pagActual, setPagActual] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [encontrados, setEncontrados] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [pagActual]);

  //Function to load products
  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/productos?paginaActual=${pagActual}&limit=50`
      );
      setLoading(false);
      setProductos(data.productos);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <BackButton />
          <SearchBar onSearch={setEncontrados} />
          <ProductList productos={productos} />
        </>
      )}
    </>
  );
};
