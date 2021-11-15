import React from "react";
import { CategoryItem } from "./CategoryItem";

export const CategoryList = ({ categorias }) => {
  return (
    <div>
      {categorias.map((categoria) => (
        <CategoryItem key={categoria._id} {...categoria} />
      ))}
    </div>
  );
};
