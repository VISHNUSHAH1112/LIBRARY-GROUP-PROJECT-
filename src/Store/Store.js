// store.js
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Slice/BooksSlice"; // slice ko import karna hai
import Fines from "../Slice/FineSlice";

// Redux store create karna
export const store = configureStore({
  reducer: {
    books: booksReducer, // yaha slice add kiya
    fines: Fines,
  },
});

export default store;
