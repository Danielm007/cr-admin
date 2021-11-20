import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { ProductForm } from "../../components/products/ProductForm";
import { BackButton } from "../../components/ui/BackButton";
import { LoadingScreen } from "../../components/ui/LoadingScreen";
import { Check } from "../../helpers/check";

const ProductoEditar = () => {
  Check();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/productos/producto/${id}`);
      if (data.ok) {
        setProduct(data.producto);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <BackButton />
          <ProductForm producto={product} />
        </>
      )}
    </Fragment>
  );
};

export default ProductoEditar;
