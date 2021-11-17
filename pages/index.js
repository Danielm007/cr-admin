import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../context/Context";

export default function Home() {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <div className="admin">
      <div className="admin-img">
        <Image alt="cristo-rey" src="/fondo.JPG" width={500} height={500} />
      </div>
      <p>Admin Comercial Cristo Rey {"⭐️ "}</p>
    </div>
  );
}
