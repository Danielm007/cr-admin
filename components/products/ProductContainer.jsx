import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { Context } from "../../context/Context";
import { types } from "../../types/types";
import { BackButton } from "../ui/BackButton";
import { Button } from "../ui/Button";
import { LoadingScreen } from "../ui/LoadingScreen";
import { ProductList } from "./ProductList";
import { SearchBar } from "./SearchBar";

//Productos por página
const productosPorPágina = 10;

export const ProductContainer = () => {
  const [pagActual, setPagActual] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [encontrados, setEncontrados] = useState([]);

  //Get Products of ContextAPI
  const {
    state: { products },
    dispatch,
  } = useContext(Context);

  //Load products every time the page loads or the actualpage changes
  useEffect(() => {
    loadProducts();
  }, [pagActual]);

  //Function to load products
  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/productos?paginaActual=${pagActual}&limit=${productosPorPágina}`
      );
      setLoading(false);
      setPages(Math.ceil(parseInt(data.documents) / productosPorPágina));
      dispatch({ type: types.loadProducts, payload: data.productos });
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

  //HandleClickPrevious
  const handleClickPrevious = () => {
    if (pagActual > 1) {
      setPagActual((prevState) => prevState - 1);
    }
  };

  //HandleClickNext
  const HandleClickNext = () => {
    if (pagActual <= pages) {
      setPagActual((prevState) => prevState + 1);
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
          {encontrados.length > 0 ? (
            <Fragment>
              <Button text="Todos" handleClick={() => setEncontrados([])} />
              <ProductList productos={encontrados} />
            </Fragment>
          ) : (
            <Fragment>
              <ProductList productos={products} />
              <div className="acciones">
                <Button
                  text={anterior}
                  onClick={handleClickPrevious}
                  disabled={pagActual > 1}
                />
                <Button
                  onClick={HandleClickNext}
                  disabled={pagActual >= pages}
                  text={siguiente}
                />
              </div>
            </Fragment>
          )}
        </>
      )}
    </>
  );
};
