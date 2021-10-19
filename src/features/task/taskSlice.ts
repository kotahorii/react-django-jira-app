import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./taskAPI";

const initialState: taskState = {
  value: 0,
  status: "idle",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {},
});

export const {} = taskSlice.actions;

export const selectCount = (state: RootState) => state.task.value;

export default taskSlice.reducer;
