import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = "http://localhost:3000/fines";

export const FetchFines = createAsyncThunk("FetchFines", async () => {
  const res = await axios.get(api);
  return res.data;
});

export const AddFines = createAsyncThunk("AddFines", async (newFines) => {
  const res = await axios.post(api, newFines);
  return res.data;
});

export const DeleteFines = createAsyncThunk("DeleteFines", async (id) => {
  const res = await axios.delete(`${api}/${id}`);
  return id;
});

const FinesSlice = createSlice({
  name: "Fines",
  initialState: {
    fines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = action.payload;
      })
      .addCase(FetchFines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(AddFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines.push(action.payload);
      })
      .addCase(AddFines.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(DeleteFines.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = state.fines.filter(
          (fines) => fines.id !== action.payload
        );
      })
      .addCase(DeleteFines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default FinesSlice.reducer;
