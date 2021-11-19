import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { Context } from "../../context/Context";
import { useForm } from "../../hooks/useForm";
import { types } from "../../types/types";

export const LoginForm = () => {
  //Router declare
  const router = useRouter();

  //get the context to dispatch the handler
  const { dispatch } = useContext(Context);

  //Custom-Hook to handle FormChanges
  const { formValues, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || !email.includes("@")) {
      toast.error("El email es inválido");
      return;
    }

    if (password.trim().length < 3) {
      toast.error("Password inválido");
      return;
    }

    loggear();
  };

  const loggear = async () => {
    try {
      const body = { email, password };
      const res = await axiosClient.post("/usuarios/login", body);
      //Save token in localStorage
      localStorage.setItem("token", res.data.token);
      //Dispatch the action to store the user
      dispatch({ type: types.user, payload: res.data.user });
      //Show notification
      toast.success(`Es bueno verte de vuelta ${res.data.user.nombre} 😊`);
      //Redirect the user to the index page
      router.replace("/");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <form className="form mt-20" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Ingresa el email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Ingresa tu password"
          />
        </div>
        <button className="btn">Ingresar</button>
      </fieldset>
    </form>
  );
};
