import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchIssues = createAsyncThunk("FetchIssues", async () => {
  const res = await axios.get("http://localhost:3000/issues");
  return res.data;
});

export const AddIssues = createAsyncThunk("AddIssues", async (NewIssues) => {
  const res = await axios.post("http://localhost:3000/issues", NewIssues);
  return res.data;
});

export const DeleteIssues = createAsyncThunk("DeleteIssues", async (id) => {
  const res = await axios.delete(`http://localhost:3000/issues/${id}`);
  return id;
});

const IssuesSlice = createSlice({
  name: "Issues",
  initialState: {
    issues: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(FetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(FetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   get
      .addCase(AddIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.push(action.payload);
      })
      .addCase(AddIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   delete

      .addCase(DeleteIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = state.issues.filter((issues)=>issues.id!==action.payload);
      })
      .addCase(DeleteIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default IssuesSlice.reducer;
