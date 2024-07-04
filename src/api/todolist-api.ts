import axios, { AxiosInstance } from "axios";
import {
  ResponseTasksType,
  ResponseType,
  TaskType,
  TodoListType,
} from "../models/api-models";
import { TaskUpdateModelType } from "../state/todoTasks-reducer";

export class Api {
  private instance: AxiosInstance;
  constructor(baseUrl: string, apiKey: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "api-key": apiKey,
      },
      withCredentials: true,
    });
  }

  async getTodoLists(): Promise<Array<TodoListType>> {
    const { data } = await this.instance.get("todo-lists");
    return data;
  }

  async getTodoListsTasks(id: string): Promise<ResponseTasksType> {
    const res = await this.instance.get(`todo-lists/${id}/tasks`);
    return res.data;
  }

  async createTodoItem(
    title: string,
  ): Promise<ResponseType<{ item: TodoListType }>> {
    const res = await this.instance.post(`todo-lists`, { title });
    return res.data;
  }

  async removeTodoList(id: string): Promise<ResponseType> {
    const res = await this.instance.delete(`todo-lists/${id}`);
    return res.data;
  }

  async updateTodoListTitle(
    todoId: string,
    title: string,
  ): Promise<ResponseType> {
    const res = await this.instance.put(`todo-lists/${todoId}`, { title });
    return res.data;
  }

  async removeTask(todolistId: string, taskId: string): Promise<ResponseType> {
    const res = await this.instance.delete(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
    return res.data;
  }

  async createTask(
    todolistId: string,
    title: string,
  ): Promise<ResponseType<{ item: TaskType }>> {
    const res = await this.instance.post(`todo-lists/${todolistId}/tasks`, {
      title,
    });
    return res.data;
  }

  async updateTaskTitle(
    todolistId: string,
    taskId: string,
    model: TaskUpdateModelType,
  ): Promise<ResponseType<{ item: TaskType }>> {
    const res = await this.instance.put(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
    return res.data;
  }

  async updateTaskStatus(
    todolistId: string,
    taskId: string,
    model: TaskUpdateModelType,
  ): Promise<ResponseType<{ item: TaskType }>> {
    const res = await this.instance.put(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );

    return res.data;
  }
}

export const todoListsApi = new Api(
  "https://social-network.samuraijs.com/api/1.1/",
  "23967c71-6100-4cb5-9d17-3bb79cd9c336",
);
