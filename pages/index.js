import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function Home() {
  //Router
  const router = useRouter();
  //Context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (user && !user.admin) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="admin">
      <div className="admin-img">
        <Image alt="cristo-rey" src="/fondo.JPG" width={500} height={500} />
      </div>
      <p>Admin Comercial Cristo Rey {"⭐️ "}</p>
    </div>
  );
}
