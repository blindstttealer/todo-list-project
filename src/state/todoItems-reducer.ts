import { v1 } from "uuid";
import { todoListsApi } from "../api/todolist-api";
import {
  FilterValuesType,
  TodoListEntityType,
  TodoListType,
} from "../models/api-models";
import { Dispatch } from "redux";

export type RemoveTodolistActionType = {
  type: "REMOVE_TODOLIST";
  id: string;
};
export type AddNewTodoItemActionType = {
  type: "ADD_NEW_TODO_ITEM";
  todoItem: TodoListType;
};
export type ChangeTodoItemTitleActionType = {
  type: "CHANGE_TODO_ITEM_TITLE";
  title: string;
  id: string;
};
export type ChangeTodoItemFilterActionType = {
  type: "CHANGE_TODO_ITEM_FILTER";
  filter: FilterValuesType;
  id: string;
};

export type SetTodoListsActionType = {
  type: "SET_TODO_LISTS";
  todoLists: TodoListType[];
};

type ActionsType =
  | RemoveTodolistActionType
  | AddNewTodoItemActionType
  | ChangeTodoItemTitleActionType
  | ChangeTodoItemFilterActionType
  | SetTodoListsActionType;
// Union types

const initialState = [] as Array<TodoListEntityType>;

export const todoItemsReducer = (
  state: Array<TodoListEntityType> = initialState,
  action: ActionsType,
): Array<TodoListEntityType> => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      return state.filter(
        (todoItem: TodoListEntityType) => todoItem.id !== action.id,
      );
    }
    case "ADD_NEW_TODO_ITEM": {
      const newTodoItem = {
        ...action.todoItem,
        filter: "all",
      } as TodoListEntityType;
      return [newTodoItem, ...state];
    }
    case "CHANGE_TODO_ITEM_TITLE": {
      return state.map((todoItem) => {
        if (todoItem.id === action.id) {
          return {
            ...todoItem,
            title: action.title,
          };
        }

        return todoItem;
      });
    }
    case "CHANGE_TODO_ITEM_FILTER": {
      return state.map((todoItem: TodoListEntityType) => {
        if (todoItem.id === action.id) {
          return {
            ...todoItem,
            filter: action.filter,
          };
        }
        return todoItem;
      });
    }

    case "SET_TODO_LISTS": {
      return action.todoLists.map((todolist) => {
        return {
          ...todolist,
          filter: "all",
        };
      });
    }
    default:
      return state;
  }
};

export const removeTodoList = (id: string): RemoveTodolistActionType => ({
  type: "REMOVE_TODOLIST",
  id,
});

export const addNewTodoItem = (
  todoItem: TodoListType,
): AddNewTodoItemActionType => ({
  type: "ADD_NEW_TODO_ITEM",
  todoItem,
});

export const changeTodoItemTitle = (
  title: string,
  id: string,
): ChangeTodoItemTitleActionType => ({
  type: "CHANGE_TODO_ITEM_TITLE",
  title,
  id,
});

export const changeTodoItemFilter = (
  id: string,
  filter: FilterValuesType,
): ChangeTodoItemFilterActionType => ({
  type: "CHANGE_TODO_ITEM_FILTER",
  id,
  filter,
});

export const setTodoListsAC = (
  todoLists: TodoListType[],
): SetTodoListsActionType => ({
  type: "SET_TODO_LISTS",
  todoLists,
});

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
