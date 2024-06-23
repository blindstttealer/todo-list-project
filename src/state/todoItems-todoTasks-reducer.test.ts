import { TodoItemType, TodoTasksType } from "../App";
import { addNewTodoItem, todoItemsReducer } from "./todoItems-reducer";
import { todoTasksReducer } from "./todoTasks-reducer";

test("ids should be equals", () => {
  const startItemsState = [] as Array<TodoItemType>;
  const stateTasksState = {} as TodoTasksType;

  const action = addNewTodoItem("new title");
  const endItemsState = todoItemsReducer(startItemsState, action);
  const endTasksState = todoTasksReducer(stateTasksState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromItems = endItemsState[0].id;

  expect(idFromTasks).toBe(action.todoId);
  expect(idFromItems).toBe(action.todoId);
  expect(idFromItems).toBe(idFromTasks);
});
