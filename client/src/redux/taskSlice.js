import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axios.get("http://localhost:3001/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await axios.post("http://localhost:3001/tasks", task);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/tasks/${task.id}`,
      task
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      throw error;
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;
