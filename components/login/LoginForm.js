import router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { axiosClient } from "../../api/api";
import { useForm } from "../../hooks/useForm";

export const LoginForm = () => {
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
      if (res.data.ok) {
        router.push("/");
        localStorage.setItem("token", res.data.token);
      }
      console.log(res);
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
