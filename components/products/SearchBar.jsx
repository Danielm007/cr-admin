import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { useForm } from "../../hooks/useForm";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ onSearch }) => {
  const { formValues, handleInputChange } = useForm({ search: "" });
  const { search } = formValues;

  const [loading, setLoading] = useState(false);

  //HandleSubmit
  const handleSubmit = (e) => {
    //Prevent the default reload of forms
    e.preventDefault();
    //Validate inputs
    if (search.trim() === "") {
      toast.error("Asegúrate de llenar el campo de búsqueda");
      return;
    }

    toast.info("Cargando productos...");
    handleSearch(search);
  };

  const handleSearch = async (busqueda) => {
    try {
      const { data } = await axiosClient.get(
        `/productos/busqueda?search=${busqueda}`
      );
      if (data.ok) {
        toast.success("Productos Cargados");
        console.log(data);
        onSearch(data.productos);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          name="search"
          onChange={handleInputChange}
          value={search}
          placeholder="Buscar Producto"
        />
      </div>
      <SearchOutlined className={styles.icon} onClick={handleSubmit} />
    </form>
  );
};
