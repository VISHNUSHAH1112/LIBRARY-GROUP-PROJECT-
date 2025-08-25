import { configureStore } from "@reduxjs/toolkit";
import Books from "../Slice/BooksSlice";
export const Store = configureStore({
  reducer: {
    books: Books
  },
});
