export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TodoListEntityType = TodoListType & {
  filter: FilterValuesType;
};

export type ResponseType<T = {}> = {
  data: T;
  resultCode: number;
  messages: Array<string>;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Late = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type TodoTasksType = {
  [key: string]: TaskType[];
};

export type ResponseTasksType = {
  items: TaskType[];
  totalCount: number;
  error: string;
};
