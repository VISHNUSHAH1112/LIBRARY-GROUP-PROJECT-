import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ShowMember = createAsyncThunk("ShowMember", async () => {
  const res = await axios.get("http://localhost:3000/members");
  return res.data;
});
export const AddMember = createAsyncThunk("AddMember", async (NewMember) => {
  const res = await axios.post("http://localhost:3000/members", NewMember);
  return res.data;
});
export const DeleteMember = createAsyncThunk("DeleteMember", async (id) => {
  const res = await axios.delete(`http://localhost:3000/members/${id}`);
  return id;
});

const MemersSlice = createSlice({
  name: "Member",
  initialState: {
    member: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ShowMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(ShowMember.fulfilled, (state, action) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(ShowMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   add
      .addCase(AddMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddMember.fulfilled, (state, action) => {
        state.loading = false;
        state.member.push(action.payload);
      })
      .addCase(AddMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   delete
      .addCase(DeleteMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteMember.fulfilled, (state, action) => {
        state.loading = false;
        state.member = state.member.filter((m) => m.id !== action.payload);
      })
      .addCase(DeleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default MemersSlice.reducer;
