// store.js
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Slice/BooksSlice";
import finesReducer from "../Slice/FineSlice";
import issuesReducer from "../Slice/IssuesSlice"; // ✅ slice import
import MembersReducer from "../Slice/MemberSlice";

// Redux store create karna
export const store = configureStore({
  reducer: {
    books: booksReducer,
    fines: finesReducer,
    issues: issuesReducer,
    member: MembersReducer,
  },
});

export default store;
