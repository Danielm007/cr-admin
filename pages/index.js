import Image from "next/image";

export default function Home() {
  return (
    <div className="admin">
      <div className="admin-img">
        <Image alt="cristo-rey" src="/fondo.JPG" layout="fill" />
      </div>
      <p>Admin Comercial Cristo Rey {"⭐️ "}</p>
    </div>
  );
}
