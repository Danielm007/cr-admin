import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { LoginForm } from "../components/login/LoginForm";
import { BackButton } from "../components/ui/BackButton";
import { Context } from "../context/Context";

const Login = () => {
  //Declarar el router
  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
