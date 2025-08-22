import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { startTransition } from "react";

const api_url = "http://localhost:3000/books";

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
  const res = await axios.get(api_url);
  return res.data;
});

export const DeleteBooks = createAsyncThunk("DeleteBooks", async (id) => {
  const res = await axios.delete(`${api_url}/${id}`);
  return res.id;
});

export const AddBooks = createAsyncThunk("AddBooks", async (books) => {
  const res = await axios.post(api_url, books);
  return res.data;
});

const initialstate = {
  books: [],
  status: "netural",
  error: null,
};

const BooksSlice = createSlice({
  name: "books",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "succes";
      state.books = action.payload;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "errors";
      state.error = action.payload.error;
    });

    builder.addCase(DeleteBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(DeleteBooks.fulfilled, (state, action) => {
      state.status = "succes";
      (state.books = action.payload), 1;
    });
    builder.addCase(DeleteBooks.rejected, (state, action) => {
      state.status = "errors";
      state.books = action.payload.error;
    });
    builder.addCase(AddBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(AddBooks.fulfilled, (state, action) => {
      state.status = "succes";
      state.books = action.payload;
    });
    builder.addCase(AddBooks.rejected, (state, action) => {
      state.status = "error";
      state.books = action.payload;
    });
  },
});
