import { v1 } from "uuid";
import { TodoTasksType } from "../App";
import {
  addTask,
  changeStatus,
  changeTodoTaskTitle,
  removeTask,
  todoTasksReducer,
} from "./todoTasks-reducer";
import { removeTodoList, todoItemsReducer } from "./todoItems-reducer";

test("reducer should add newTask", () => {
  const tasksId1 = v1();
  const tasksId2 = v1();

  const startState: TodoTasksType = {
    [tasksId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "Js", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "MobX", isDone: true },
    ],
    [tasksId2]: [
      { id: v1(), title: "Minecraft", isDone: false },
      { id: v1(), title: "CS", isDone: true },
      { id: v1(), title: "Dota", isDone: false },
      { id: v1(), title: "Pubg", isDone: true },
    ],
  };

  const value = "new name";

  const endState = todoTasksReducer(startState, addTask(value, tasksId2));

  expect(endState[tasksId2][0].title).toBe(value);
  expect(endState[tasksId2][4].title).toBe("Pubg");
  expect(endState[tasksId2][0].isDone).toBe(false);
});

test("reducer should remove task", () => {
  const tasksId1 = v1();
  const tasksId2 = v1();

  const startState: TodoTasksType = {
    [tasksId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "Js", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "MobX", isDone: true },
    ],
    [tasksId2]: [
      { id: v1(), title: "Minecraft", isDone: false },
      { id: v1(), title: "CS", isDone: true },
      { id: v1(), title: "Dota", isDone: false },
      { id: v1(), title: "Pubg", isDone: true },
    ],
  };

  const taskIdToDelete = startState[tasksId2][0].id;

  const endState = todoTasksReducer(
    startState,
    removeTask(taskIdToDelete, tasksId2),
  );

  expect(endState[tasksId2].length).toBe(3);
  expect(endState[tasksId2][0].title).toBe("CS");
});

test("reducer should change task status", () => {
  const tasksId1 = v1();
  const tasksId2 = v1();

  const startState: TodoTasksType = {
    [tasksId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "Js", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "MobX", isDone: true },
    ],
    [tasksId2]: [
      { id: v1(), title: "Minecraft", isDone: false },
      { id: v1(), title: "CS", isDone: true },
      { id: v1(), title: "Dota", isDone: false },
      { id: v1(), title: "Pubg", isDone: true },
    ],
  };

  const taskIdToChangeStatus = startState[tasksId2][0].id;
  const statusToChange = true;

  const endState = todoTasksReducer(
    startState,
    changeStatus(taskIdToChangeStatus, tasksId2, statusToChange),
  );

  expect(endState[tasksId2][0].isDone).toBe(true);
  expect(endState[tasksId2][2].isDone).toBe(false);
});
test("reducer should change task title", () => {
  const tasksId1 = v1();
  const tasksId2 = v1();

  const startState: TodoTasksType = {
    [tasksId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "Js", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "MobX", isDone: true },
    ],
    [tasksId2]: [
      { id: v1(), title: "Minecraft", isDone: false },
      { id: v1(), title: "CS", isDone: true },
      { id: v1(), title: "Dota", isDone: false },
      { id: v1(), title: "Pubg", isDone: true },
    ],
  };

  const taskIdToChangeTitle = startState[tasksId2][0].id;
  const titleToChange = "My new title";

  const endState = todoTasksReducer(
    startState,
    changeTodoTaskTitle(titleToChange, tasksId2, taskIdToChangeTitle),
  );

  expect(endState[tasksId2][0].title).toBe(titleToChange);
  expect(endState[tasksId2][2].title).toBe("Dota");
});

test("reducer should delete [todoId]: [tasks] on RemoveTodoList", () => {
  const tasksId1 = v1();
  const tasksId2 = v1();

  const startState: TodoTasksType = {
    [tasksId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "Js", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "MobX", isDone: true },
    ],
    [tasksId2]: [
      { id: v1(), title: "Minecraft", isDone: false },
      { id: v1(), title: "CS", isDone: true },
      { id: v1(), title: "Dota", isDone: false },
      { id: v1(), title: "Pubg", isDone: true },
    ],
  };

  const action = removeTodoList(tasksId2);

  const endState = todoTasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[1]).toBeUndefined();
});
