import { v1 } from "uuid";
import {
  addNewTodoItem,
  changeTodoItemFilter,
  changeTodoItemTitle,
  removeTodoList,
  setTodoListsAC,
  todoItemsReducer,
} from "./todoItems-reducer";
import { TodoListEntityType, TodoListType } from "../models/api-models";

const tasksId1 = v1();
const tasksId2 = v1();

let startState: TodoListEntityType[] = [];

beforeEach(() => {
  startState = [
    {
      id: tasksId1,
      title: "What to learn",
      filter: "all",
      order: 0,
      addedDate: "",
    },
    {
      id: tasksId2,
      title: "What to play",
      filter: "completed",
      order: 0,
      addedDate: "",
    },
  ];
});

test("correct todoItem should be removed", () => {
  const endState = todoItemsReducer(startState, removeTodoList(tasksId2));
  expect(endState[0].title).toBe("What to learn");
  expect(endState.length).toBe(1);
});

test("correct todoItem should be add new task", () => {
  const newTitle = "SomeBody once told me";

  const newTodoItem: TodoListEntityType = {
    id: "2222",
    order: 1,
    filter: "all",
    title: newTitle,
    addedDate: "",
  };

  const endState = todoItemsReducer(startState, addNewTodoItem(newTodoItem));

  expect(endState[0].title).toBe(newTitle);
  expect(endState.length).toBe(3);
});

test("correct todoItem should be change his title", () => {
  const newTitle = "SomeBody once told me";

  const endState = todoItemsReducer(
    startState,
    changeTodoItemTitle(newTitle, tasksId2),
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTitle);
});

test("correct todoItem should be change his filter", () => {
  const updateFilter = "active";

  const endState = todoItemsReducer(
    startState,
    changeTodoItemFilter(tasksId2, updateFilter),
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(updateFilter);
});

test("corrent test should be added all todolists", () => {
  const endState: TodoListType[] = todoItemsReducer(
    [],
    setTodoListsAC([
      {
        id: tasksId1,
        title: "totototototototototototo",
        order: 0,
        addedDate: "",
      },
      {
        id: tasksId2,
        title: "gogogogogo",
        order: 0,
        addedDate: "",
      },
    ]),
  );

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe("totototototototototototo");
  expect(endState[1].title).toBe("gogogogogo");
});
