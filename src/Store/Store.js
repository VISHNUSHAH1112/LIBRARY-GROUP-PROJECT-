// store.js
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Slice/BooksSlice";   // slice ko import karna hai

// Redux store create karna
export const store = configureStore({
  reducer: {
    books: booksReducer,   // yaha slice add kiya
  },
});

export default store;
