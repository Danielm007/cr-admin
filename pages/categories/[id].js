import React from "react";
import { useRouter } from "next/router";
import { BackButton } from "../../components/ui/BackButton";

const Categoria = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <BackButton />
      {id}
    </div>
  );
};

export default Categoria;
