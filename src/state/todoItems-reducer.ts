import { FilterValuesType, TodoItemType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE_TODOLIST";
  id: string;
};
export type AddNewTodoItemActionType = {
  type: "ADD_NEW_TODO_ITEM";
  title: string;
  todoId: string;
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

type ActionsType =
  | RemoveTodolistActionType
  | AddNewTodoItemActionType
  | ChangeTodoItemTitleActionType
  | ChangeTodoItemFilterActionType;

const initialState = [] as Array<TodoItemType>;

export const todoItemsReducer = (
  state: Array<TodoItemType> = initialState,
  action: ActionsType,
): Array<TodoItemType> => {
  switch (action.type) {
    case "REMOVE_TODOLIST": {
      return state.filter(
        (todoItem: TodoItemType) => todoItem.id !== action.id,
      );
    }
    case "ADD_NEW_TODO_ITEM": {
      return [
        {
          id: action.todoId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];
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
      return state.map((todoItem: TodoItemType) => {
        if (todoItem.id === action.id) {
          return {
            ...todoItem,
            filter: action.filter,
          };
        }
        return todoItem;
      });
    }
    default:
      return state;
  }
};

export const removeTodoList = (id: string): RemoveTodolistActionType => ({
  type: "REMOVE_TODOLIST",
  id: id,
});

export const addNewTodoItem = (title: string): AddNewTodoItemActionType => ({
  type: "ADD_NEW_TODO_ITEM",
  title,
  todoId: v1(),
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
