import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export const Check = () => {
  //Router
  const router = useRouter();
  //Context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return null;
    }
    if (user && !user.admin) {
      router.push("/login");
    }
  }, [user]);
};
