import { types } from "../types/types";

export const Reducer = (state, action) => {
  switch (action.type) {
    case types.user:
      return {
        ...state,
        user: action.payload,
      };

    case types.userLogout:
      return {
        ...state,
        user: null,
      };

    case types.loadProducts:
      return {
        ...state,
        products: action.payload,
      };

    case types.removeProduct:
      return {
        ...state,
        products: state.products.filter(
          (prod) => prod._id !== action.payload.id
        ),
      };

    case types.loadCategories:
      return {
        ...state,
        categories: action.payload,
      };

    case types.removeCategory:
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat._id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
