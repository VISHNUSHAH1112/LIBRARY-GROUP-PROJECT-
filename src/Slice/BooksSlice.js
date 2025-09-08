import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://localhost:3000/books";

export const FetchData = createAsyncThunk("FetchData", async () => {
  const res = await axios.get(api);
  return res.data;
});

export const DeleteData = createAsyncThunk("DeleteData", async (id) => {
  const res = await axios.delete(`${api}/${id}`);
  return id;
});

export const AddBooks = createAsyncThunk("AddBooks", async (books) => {
  const res = await axios.post(api, books);
  return res.data;
});

const initialState = {
  books: [],
  status: "neutral",
  error: null,
};

const booksslice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(FetchData.fulfilled, (state, action) => {
      state.status = "success";
      state.books = action.payload;
    });
    builder.addCase(FetchData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //add

    builder.addCase(AddBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AddBooks.fulfilled, (state, action) => {
      state.status = "success";
      state.books.push(action.payload);
    });
    builder.addCase(AddBooks.rejected, (state) => {
      state.status = "error";
      state.error = action.error.message;
    });

    // delete

    builder.addCase(DeleteData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(DeleteData.fulfilled, (state, action) => {
      state.status = "success";
      state.status = (action.payload, 1);
    });
    builder.addCase(DeleteData.rejected, (state, error) => {
      state.status = "error";
      state.error.action.error.message;
    });
  },
});
export default booksslice.reducer;
