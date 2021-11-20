import React from "react";
import { ProductForm } from "../components/products/ProductForm";
import { BackButton } from "../components/ui/BackButton";
import { Check } from "../helpers/check";

export default function AgregarProducto() {
  Check();
  return (
    <>
      <BackButton />
      <ProductForm />
    </>
  );
}
