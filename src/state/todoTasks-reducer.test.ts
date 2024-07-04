import {
  addTask,
  changeStatus,
  changeTodoTaskTitle,
  removeTask,
  todoTasksReducer,
} from "./todoTasks-reducer";
import { removeTodoList, setTodoListsAC } from "./todoItems-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TodoTasksType,
} from "../models/api-models";

let startState: TodoTasksType = {};

beforeEach(() => {
  startState = {
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        startDate: "",
        description: "",
        priority: 0,
        todoListId: "todoListId1",
      },
      {
        id: "2",
        title: "Js",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        order: 0,
        startDate: "",
        description: "",
        priority: 0,
        todoListId: "todoListId1",
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "Minecraft",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        startDate: "",
        description: "",
        priority: 0,
        todoListId: "todoListId2",
      },
      {
        id: "2",
        title: "CS",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        startDate: "",
        description: "",
        priority: 0,
        todoListId: "todoListId2",
      },
      {
        id: "3",
        title: "Dota",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        startDate: "",
        description: "",
        priority: 0,
        todoListId: "todoListId2",
      },
      {
        id: "4",
        title: "Pubg",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        order: 0,
        startDate: "",
        description: "",
        priority: 0,
        todoListId: "todoListId2",
      },
    ],
  };
});

test("reducer should add newTask", () => {
  const value = "new name";

  const newTask: TaskType = {
    id: "2",
    title: value,
    status: TaskStatuses.New,
    addedDate: "",
    deadline: "",
    order: 0,
    startDate: "",
    description: "",
    priority: 0,
    todoListId: "todoListId2",
  };

  const endState = todoTasksReducer(
    startState,
    addTask(newTask, "todoListId2"),
  );

  expect(endState["todoListId2"][0].title).toBe(value);
  expect(endState["todoListId2"][4].title).toBe("Pubg");
  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test("reducer should remove task", () => {
  const taskIdToDelete = startState["todoListId2"][0].id;

  const endState = todoTasksReducer(
    startState,
    removeTask(taskIdToDelete, "todoListId2"),
  );

  expect(endState["todoListId2"].length).toBe(3);
  expect(endState["todoListId2"][0].title).toBe("CS");
});

test("reducer should change task status", () => {
  const taskIdToChangeStatus = startState["todoListId2"][0].id;
  const statusToChange = TaskStatuses.Completed;

  const endState = todoTasksReducer(
    startState,
    changeStatus(taskIdToChangeStatus, "todoListId2", statusToChange),
  );

  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.Completed);
  expect(endState["todoListId2"][2].status).toBe(TaskStatuses.Completed);
});
test("reducer should change task title", () => {
  const taskIdToChangeTitle = startState["todoListId2"][0].id;
  const titleToChange = "My new title";

  const endState = todoTasksReducer(
    startState,
    changeTodoTaskTitle(titleToChange, "todoListId2", taskIdToChangeTitle),
  );

  expect(endState["todoListId2"][0].title).toBe(titleToChange);
  expect(endState["todoListId2"][2].title).toBe("Dota");
});

test("reducer should delete [todoId]: [tasks] on RemoveTodoList", () => {
  const action = removeTodoList("todoListId2");

  const endState = todoTasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[1]).toBeUndefined();
});

test("tasks should be empty array when todoLists added", () => {
  const endState = todoTasksReducer(
    startState,
    setTodoListsAC([
      {
        id: "tasksId1",
        title: "totototototototototototo",
        order: 0,
        addedDate: "",
      },
      {
        id: "tasksId2",
        title: "gogogogogo",
        order: 0,
        addedDate: "",
      },
    ]),
  );

  expect(endState["tasksId1"]).toStrictEqual([]);
  expect(endState["tasksId2"]).toStrictEqual([]);
});
