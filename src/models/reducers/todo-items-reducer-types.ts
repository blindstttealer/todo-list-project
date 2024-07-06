import {
  addNewTodoItem,
  changeTodoItemFilter,
  changeTodoItemTitle,
  removeTodoList,
  setTodoListsAC,
} from "../../state/todoItems-reducer";

export type AddNewTodoItemActionType = ReturnType<typeof addNewTodoItem>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodoList>;
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>;

export type ActionsType =
  | RemoveTodolistActionType
  | AddNewTodoItemActionType
  | SetTodoListsActionType
  | ReturnType<typeof changeTodoItemTitle>
  | ReturnType<typeof changeTodoItemFilter>;
