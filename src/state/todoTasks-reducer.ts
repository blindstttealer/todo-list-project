import { v1 } from "uuid";
import {
  AddNewTodoItemActionType,
  RemoveTodolistActionType,
  SetTodoListsActionType,
} from "./todoItems-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TodoTasksType,
} from "../models/api-models";
import { Dispatch } from "redux";
import { todoListsApi } from "../api/todolist-api";
import { AppRootState } from "./store";
import { find } from "@reduxjs/toolkit/dist/utils";

type AddTaskActionType = {
  type: "ADD_TASK";
  task: TaskType;
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
  status: TaskStatuses;
};

type ChangeTodoTaskTitleActionType = {
  type: "CHANGE_TODO_TASK_TITLE";
  title: string;
  id: string;
  todoId: string;
};

type SetTasksActionType = {
  type: "SET_TASKS";
  tasks: TaskType[];
  todoId: string;
};

type ActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeStatusActionType
  | ChangeTodoTaskTitleActionType
  | RemoveTodolistActionType
  | AddNewTodoItemActionType
  | SetTodoListsActionType
  | SetTasksActionType;

const initialState = {} as TodoTasksType;

export const todoTasksReducer = (
  state: TodoTasksType = initialState,
  action: ActionsType,
): TodoTasksType => {
  switch (action.type) {
    case "ADD_TASK": {
      const tasks = state[action.todoId];
      const newTask: TaskType = action.task;
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

      const changedTasks = findTasksToStatusChange.map((todoItem) => {
        if (todoItem.id === action.id) {
          return {
            ...todoItem,
            status: action.status,
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
        [action.todoItem.id]: [],
      };
    }
    case "REMOVE_TODOLIST": {
      const { [action.id]: removed, ...updatedTasks } = state;

      return {
        ...updatedTasks,
      };
    }
    case "SET_TODO_LISTS": {
      return action.todoLists.reduce(
        (accState, todoList) => {
          accState[todoList.id] = [];
          return accState;
        },
        { ...state },
      );
    }
    case "SET_TASKS": {
      const copyState = { ...state };
      copyState[action.todoId] = action.tasks;
      return copyState;
    }

    default:
      return state;
  }
};

export const addTask = (task: TaskType, todoId: string): AddTaskActionType => ({
  type: "ADD_TASK",
  task,
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
  status: TaskStatuses,
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

export const setTasks = (
  tasks: TaskType[],
  todoId: string,
): SetTasksActionType => ({
  type: "SET_TASKS",
  tasks,
  todoId,
});

export const getTasksTC = (todolistId: string) => {
  return async (dispatch: Dispatch) => {
    const response = await todoListsApi.getTodoListsTasks(todolistId);
    console.log(response, "response");
    dispatch(setTasks(response.items, todolistId));
  };
};

export const removeTaskTC = (todoListId: string, taskId: string) => {
  return async (dispatch: Dispatch) => {
    const response = await todoListsApi.removeTask(todoListId, taskId);
    if (response.resultCode === 0) {
      dispatch(removeTask(taskId, todoListId));
    }
  };
};

export const createTaskTC = (todoId: string, title: string) => {
  return async (dispatch: Dispatch) => {
    const response = await todoListsApi.createTask(todoId, title);
    const newTask = response.data.item;
    dispatch(addTask(newTask, todoId));
  };
};

export type TaskUpdateModelType = {
  // Обязательные Properties, которые принимает сервер, создали тип для них
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export const updateTaskTitleTC = (
  todoId: string,
  taskId: string,
  newTitle: string,
  task: TaskType,
) => {
  return async (dispatch: Dispatch) => {
    const { description, status, priority, startDate, deadline } = task;
    const model = {
      title: newTitle,
      status,
      priority,
      description,
      deadline,
      startDate,
    } as TaskUpdateModelType;

    const response = await todoListsApi.updateTaskTitle(todoId, taskId, model);
    if (response.resultCode === 0) {
      dispatch(changeTodoTaskTitle(newTitle, todoId, taskId));
    }
  };
};

export const updateTaskStatusTC = (
  todoId: string,
  taskId: string,
  newStatus: TaskStatuses,
) => {
  return async (dispatch: Dispatch, getState: () => AppRootState) => {
    const { description, priority, startDate, deadline, title } =
      getState().tasks[todoId].find(
        (t) => t.id === taskId,
      ) as TaskUpdateModelType;

    const model = {
      title,
      status: newStatus,
      priority,
      description,
      deadline,
      startDate,
    } as TaskUpdateModelType;

    const response = await todoListsApi.updateTaskStatus(todoId, taskId, model);
    if (response.resultCode === 0) {
      dispatch(changeStatus(taskId, todoId, newStatus));
    }
  };
};
