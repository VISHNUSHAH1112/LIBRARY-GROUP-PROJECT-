import { configureStore } from "@reduxjs/toolkit";
import Books from "../Components/Books";
export const Store = configureStore({
  reducer: {
    books: Books,
  },
});
