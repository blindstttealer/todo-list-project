import { todoListsApi } from "../api/todolist-api";
import {
  FilterValuesType,
  TodoListEntityType,
  TodoListType,
} from "../models/api-models";
import { Dispatch } from "redux";
import { ActionsType } from "../models/reducers/todo-items-reducer-types";

const initialState = [] as Array<TodoListEntityType>;

export const todoItemsReducer = (
  state: Array<TodoListEntityType> = initialState,
  action: ActionsType,
): Array<TodoListEntityType> => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD_NEW_TODO_ITEM": {
      return [{ ...action.todoItem, filter: "all" }, ...state];
    }
    case "CHANGE_TODO_ITEM_TITLE": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl,
      );
    }
    case "CHANGE_TODO_ITEM_FILTER": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl,
      );
    }
    case "SET_TODO_LISTS": {
      return action.todoLists.map((tl) => ({ ...tl, filter: "all" }));
    }
    default:
      return state;
  }
};

export const removeTodoList = (id: string) =>
  ({
    type: "REMOVE_TODOLIST",
    id,
  }) as const;
export const addNewTodoItem = (todoItem: TodoListType) =>
  ({
    type: "ADD_NEW_TODO_ITEM",
    todoItem,
  }) as const;
export const changeTodoItemTitle = (title: string, id: string) =>
  ({
    type: "CHANGE_TODO_ITEM_TITLE",
    title,
    id,
  }) as const;
export const changeTodoItemFilter = (id: string, filter: FilterValuesType) =>
  ({
    type: "CHANGE_TODO_ITEM_FILTER",
    id,
    filter,
  }) as const;
export const setTodoListsAC = (todoLists: TodoListType[]) =>
  ({
    type: "SET_TODO_LISTS",
    todoLists,
  }) as const;

export const getTodoListsTC = () => {
  return async (dispatch: Dispatch) => {
    const response = await todoListsApi.getTodoLists();
    dispatch(setTodoListsAC(response));
  };
};
export const createTodoItem = (title: string) => {
  return async (dispatch: Dispatch) => {
    const response = await todoListsApi.createTodoItem(title);
    if (response.resultCode === 0) {
      dispatch(addNewTodoItem(response.data.item));
    }
  };
};
export const removeTodoListTC = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await todoListsApi.removeTodoList(id);
    if (response.resultCode === 0) {
      dispatch(removeTodoList(id));
    }
  };
};
export const updateTodoListTitleTC = (todoId: string, title: string) => {
  return async (dispatch: Dispatch) => {
    await todoListsApi.updateTodoListTitle(todoId, title);
    dispatch(changeTodoItemTitle(title, todoId));
  };
};
