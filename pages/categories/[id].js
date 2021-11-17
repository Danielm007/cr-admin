import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BackButton } from "../../components/ui/BackButton";
import { axiosClient } from "../../api/api";
import { LoadingScreen } from "../../components/ui/LoadingScreen";
import { CategoryForm } from "../../components/categories/CategoryForm";
import { toast } from "react-toastify";

const Categoria = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  //Consultar la categoría y cargar al Formulario
  const loadCategory = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await axiosClient.get(`/categorias/categoria/${id}`);
      if (res.data.ok) {
        setCategory(res.data.categoria);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {category && (
        <>
          <CategoryForm category={category} />
        </>
      )}
    </>
  );
};

export default Categoria;
