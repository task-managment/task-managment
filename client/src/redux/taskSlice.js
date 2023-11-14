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
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const updateState = createAsyncThunk(
  "tasks/updateState",
  async ({ taskId, completed }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/updatestatus/${taskId}`,
        { completed }
      );
      return { taskId, completed: response.data.completed }; // Return the updated data
    } catch (error) {
      throw error;
    }
  }
);

// export const updateState = createAsyncThunk(
//   "tasks/updateState",
//   async ({ taskId, completed }) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3001/tasks/${taskId}`,
//         { completed } // Send the completed status to update
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const updateState = createAsyncThunk(
//   "tasks/updateState",
//   async (taskId, { getState }) => {
//     const state = getState();
//     const updatedTasks = state.tasks.map((task) => {
//       if (task.id === taskId) {
//         // Toggle the 'completed' field
//         return {
//           ...task,
//           completed: !task.completed,
//         };
//       }
//       return task;
//     });

//     // Send a PUT request to update the JSON server with the updated tasks
//     const response = await axios.put(`http://localhost:3001/tasks/${taskId}`, {
//       completed: !state.tasks.find((task) => task.id === taskId).completed,
//     });

//     if (response.completed === 200) {
//       return updatedTasks;
//     } else {
//       throw new Error("Update failed");
//     }
//   }
// );

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
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
          (task) => task.id === action.payload.id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
      })
      .addCase(updateState.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { taskId, completed } = action.payload;
        const taskToUpdate = state.tasks.find((task) => task.id === taskId);
        if (taskToUpdate) {
          taskToUpdate.completed = completed;
        }
      })
      //   .addCase(updateState.fulfilled, (state, action) => {
      //     state.status = "succeeded";
      //     const updatedTaskIndex = state.tasks.findIndex(
      //       (task) => task.id === action.payload.id
      //     );
      //     if (updatedTaskIndex !== -1) {
      //       state.tasks[updatedTaskIndex].completed = action.payload.completed;
      //     }
      //   })

      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //   .addCase(updateState.pending, (state) => {
      //     state.status = "loading";
      //   })
      //   .addCase(updateState.fulfilled, (state, action) => {
      //     state.status = "succeeded";
      //     // Find the updated task and update its completed status in state
      //     const updatedTaskIndex = state.tasks.findIndex(
      //       (task) => task.id === action.payload.id
      //     );
      //     if (updatedTaskIndex !== -1) {
      //       state.tasks[updatedTaskIndex].completed = action.payload.completed;
      //     }
      //   })
      //   .addCase(updateState.rejected, (state, action) => {
      //     state.status = "failed";
      //     state.error = action.error.message;
      //   })
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
