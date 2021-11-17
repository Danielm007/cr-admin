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
    default:
      return state;
  }
};
