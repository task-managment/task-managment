import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../src/redux/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
