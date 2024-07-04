import { todoItemsReducer } from "./todoItems-reducer";
import { todoTasksReducer } from "./todoTasks-reducer";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  items: todoItemsReducer,
  tasks: todoTasksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof rootReducer>;
