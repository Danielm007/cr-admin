import router from "next/router";
import React, { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../api/api";
import { Reducer } from "../reducers/reducer";
import { types } from "../types/types";

const initialState = {
  user: null,
  products: [],
};

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    verifyIsLoggedIn();
  }, []);

  const verifyIsLoggedIn = async () => {
    try {
      const res = await axiosClient.get("/usuarios/check", {
        headers: {
          "x-token": localStorage.getItem("token") || null,
        },
      });
      dispatch({ type: types.user, payload: res.data.user });
      toast.success(`Es bueno verte de vuelta ${res.data.user.nombre} 😊`);
    } catch (err) {
      if (err.response.data.msg === "Token no válido") {
        toast.error("Tu sesión ha expirado vuelve a iniciar sesión por favor");
        dispatch({ type: types.userLogout });
        router.replace("/login");
      }
    }
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <main className="container">{children}</main>
    </Context.Provider>
  );
};
