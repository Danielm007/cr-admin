import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { BackButton } from "../ui/BackButton";
import { Button } from "../ui/Button";
import { LoadingScreen } from "../ui/LoadingScreen";
import { ProductList } from "./ProductList";
import { SearchBar } from "./SearchBar";

export const ProductContainer = () => {
  const [pagActual, setPagActual] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [encontrados, setEncontrados] = useState([]);

  //Load products every time the page loads or the actualpage changes
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

  //Previous button text
  const anterior = (
    <Fragment>
      <ArrowLeftOutlined /> Anterior
    </Fragment>
  );

  //Next button text
  const siguiente = (
    <Fragment>
      Siguiente <ArrowRightOutlined />
    </Fragment>
  );

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <BackButton />
          <SearchBar onSearch={setEncontrados} />
          {encontrados.length > 0 ? (
            <Fragment>
              <Button text="Todos" handleClick={() => setEncontrados([])} />
              <ProductList productos={encontrados} />
            </Fragment>
          ) : (
            <Fragment>
              <ProductList productos={productos} />
              <div className="acciones">
                <Button text={anterior} />
                <Button text={siguiente} />
              </div>
            </Fragment>
          )}
        </>
      )}
    </>
  );
};
