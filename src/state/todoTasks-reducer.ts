import { TodoTasksType } from "../App";
import { TaskType } from "../components/Todolist";
import { v1 } from "uuid";
import {
  AddNewTodoItemActionType,
  RemoveTodolistActionType,
} from "./todoItems-reducer";

type AddTaskActionType = {
  type: "ADD_TASK";
  value: string;
  todoId: string;
};

type RemoveTaskActionType = {
  type: "REMOVE_TASK";
  todoId: string;
  id: string;
};

type ChangeStatusActionType = {
  type: "CHANGE_STATUS";
  todoId: string;
  id: string;
  status: boolean;
};

type ChangeTodoTaskTitleActionType = {
  type: "CHANGE_TODO_TASK_TITLE";
  title: string;
  id: string;
  todoId: string;
};

type ActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeStatusActionType
  | ChangeTodoTaskTitleActionType
  | RemoveTodolistActionType
  | AddNewTodoItemActionType;

const initialState = {} as TodoTasksType;

export const todoTasksReducer = (
  state: TodoTasksType = initialState,
  action: ActionsType,
): TodoTasksType => {
  switch (action.type) {
    case "ADD_TASK": {
      const tasks = state[action.todoId];
      const newTask: TaskType = {
        id: v1(),
        isDone: false,
        title: action.value,
      };
      const updatedTasks = [newTask, ...tasks];
      return {
        ...state,
        [action.todoId]: updatedTasks,
      };
    }
    case "REMOVE_TASK": {
      const filteredTasks = state[action.todoId].filter(
        (todoItem) => todoItem.id !== action.id,
      );
      return {
        ...state,
        [action.todoId]: filteredTasks,
      };
    }

    case "CHANGE_STATUS": {
      const findTasksToStatusChange = state[action.todoId];

      const changedTasks = findTasksToStatusChange.map((todoItem: TaskType) => {
        if (todoItem.id === action.id) {
          return {
            ...todoItem,
            isDone: action.status,
          };
        }
        return todoItem;
      });
      return {
        ...state,
        [action.todoId]: changedTasks,
      };
    }
    case "CHANGE_TODO_TASK_TITLE": {
      const findTasksToStatusChange = state[action.todoId];
      const changedTasks = findTasksToStatusChange.map((todoItem: TaskType) => {
        if (todoItem.id === action.id) {
          return {
            ...todoItem,
            title: action.title,
          };
        }
        return todoItem;
      });

      return {
        ...state,
        [action.todoId]: changedTasks,
      };
    }

    case "ADD_NEW_TODO_ITEM": {
      return {
        ...state,
        [action.todoId]: [],
      };
    }
    case "REMOVE_TODOLIST": {
      const { [action.id]: removed, ...updatedTasks } = state;

      return {
        ...updatedTasks,
      };
    }

    default:
      return state;
  }
};

export const addTask = (value: string, todoId: string): AddTaskActionType => ({
  type: "ADD_TASK",
  value,
  todoId,
});

export const removeTask = (
  id: string,
  todoId: string,
): RemoveTaskActionType => ({
  type: "REMOVE_TASK",
  id,
  todoId,
});

export const changeStatus = (
  id: string,
  todoId: string,
  status: boolean,
): ChangeStatusActionType => ({
  type: "CHANGE_STATUS",
  status,
  id,
  todoId,
});

export const changeTodoTaskTitle = (
  title: string,
  todoId: string,
  id: string,
): ChangeTodoTaskTitleActionType => ({
  type: "CHANGE_TODO_TASK_TITLE",
  title,
  todoId,
  id,
});
