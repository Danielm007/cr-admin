import React from "react";
import { CategoryForm } from "../components/categories/CategoryForm";
import { Check } from "../helpers/check";

export default function AgregarCategoria() {
  Check();

  return <CategoryForm />;
}
