import { combineReducers } from "redux";
import { todoItemsReducer } from "./todoItems-reducer";
import { todoTasksReducer } from "./todoTasks-reducer";
import { legacy_createStore as createStore } from "redux";

const rootReducer = combineReducers({
  items: todoItemsReducer,
  tasks: todoTasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
