import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PostTask, ReadTask } from "../../types/types";

export const initialState = {
  editedTask: {
    id: 0,
    task: "",
    description: "",
    criteria: "",
    responsible: 0,
    estimate: 0,
    category: 0,
    status: "",
  },
  selectedTask: {
    id: 0,
    task: "",
    description: "",
    criteria: "",
    owner: 0,
    owner_username: "",
    responsible: 0,
    responsible_username: "",
    estimate: 0,
    category: 0,
    category_item: "",
    status: "",
    status_name: "",
    created_at: "",
    updated_at: "",
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    editTask(state, action: PayloadAction<PostTask>) {
      state.editedTask = action.payload;
    },
    selectTask(state, action: PayloadAction<ReadTask>) {
      state.selectedTask = action.payload;
    },
  },
});

export const { editTask, selectTask } = taskSlice.actions;
export const selectSelectedTask = (state: RootState) => state.task.editedTask;
export const selectEditedTask = (state: RootState) => state.task.selectedTask;
export default taskSlice.reducer;
