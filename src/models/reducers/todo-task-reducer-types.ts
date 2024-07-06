import {
  AddNewTodoItemActionType,
  RemoveTodolistActionType,
  SetTodoListsActionType,
} from "./todo-items-reducer-types";
import {
  addTask,
  changeStatus,
  changeTodoTaskTitle,
  removeTask,
  setTasks,
} from "../../state/todoTasks-reducer";

export type ActionsType =
  | ReturnType<typeof addTask>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof changeStatus>
  | ReturnType<typeof changeTodoTaskTitle>
  | ReturnType<typeof setTasks>
  | RemoveTodolistActionType
  | AddNewTodoItemActionType
  | SetTodoListsActionType;
