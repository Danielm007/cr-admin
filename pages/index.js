import Image from "next/image";

export default function Home() {
  return (
    <div className="admin">
      <div className="admin-img">
        <Image alt="cristo-rey" src="/fondo.JPG" width={500} height={500} />
      </div>
      <p>Admin Comercial Cristo Rey {"⭐️ "}</p>
    </div>
  );
}
