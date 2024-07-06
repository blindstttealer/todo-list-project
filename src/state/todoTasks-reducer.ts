import {} from "./todoItems-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TodoTasksType,
} from "../models/api-models";
import { Dispatch } from "redux";
import { todoListsApi } from "../api/todolist-api";
import { AppRootState } from "./store";
import { ActionsType } from "../models/reducers/todo-task-reducer-types";

const initialState = {} as TodoTasksType;
export const todoTasksReducer = (
  state: TodoTasksType = initialState,
  action: ActionsType,
): TodoTasksType => {
  switch (action.type) {
    case "ADD_TASK": {
      return {
        ...state,
        [action.todoId]: [action.task, ...state[action.todoId]],
      };
    }
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter((t) => t.id !== action.id),
      };
    }

    case "CHANGE_STATUS": {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map((t) =>
          t.id === action.id ? { ...t, status: action.status } : t,
        ),
      };
    }
    case "CHANGE_TODO_TASK_TITLE": {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t,
        ),
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

export const addTask = (task: TaskType, todoId: string) =>
  ({
    type: "ADD_TASK",
    task,
    todoId,
  }) as const;
export const removeTask = (id: string, todoId: string) =>
  ({
    type: "REMOVE_TASK",
    id,
    todoId,
  }) as const;
export const changeStatus = (
  id: string,
  todoId: string,
  status: TaskStatuses,
) =>
  ({
    type: "CHANGE_STATUS",
    status,
    id,
    todoId,
  }) as const;
export const changeTodoTaskTitle = (
  title: string,
  todoId: string,
  id: string,
) =>
  ({
    type: "CHANGE_TODO_TASK_TITLE",
    title,
    todoId,
    id,
  }) as const;
export const setTasks = (tasks: TaskType[], todoId: string) =>
  ({
    type: "SET_TASKS",
    tasks,
    todoId,
  }) as const;

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

//types
export type TaskUpdateModelType = {
  // Обязательные Properties, которые принимает сервер, создали тип для них
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
