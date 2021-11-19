import React from "react";
import { ProductContainer } from "../../components/products/ProductContainer";
import { Check } from "../../helpers/check";

const Products = () => {
  Check();

  return <ProductContainer />;
};

export default Products;
