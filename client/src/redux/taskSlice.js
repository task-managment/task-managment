import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axios.get("http://localhost:5000/alltodos");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await axios.post("http://localhost:5000/newtodo", task);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const updateTask = createAsyncThunk("tasks/updateTask", async (task) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/updatetodo/${task.id}`,

      task
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const updateState = createAsyncThunk(
  "tasks/updateState",
  async ({ taskId, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/updatestatus/${taskId}`,

        { status }
      );

      return { taskId, status: response.data.status }; // Return the updated data
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      console.log(taskId);
      await axios.put(`http://localhost:5000/deletetodo/${taskId}`);
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
          (task) => task._id === action.payload.id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { taskId, completed } = action.payload;
        const taskToUpdate = state.tasks.find((task) => task._id === taskId);
        if (taskToUpdate) {
          taskToUpdate.completed = completed;
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
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;
