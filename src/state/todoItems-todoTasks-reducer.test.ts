import { addNewTodoItem, todoItemsReducer } from "./todoItems-reducer";
import { todoTasksReducer } from "./todoTasks-reducer";
import { TodoListEntityType, TodoTasksType } from "../models/api-models";

test("ids should be equals", () => {
  const startItemsState = [] as Array<TodoListEntityType>;
  const stateTasksState = {} as TodoTasksType;

  const newTodoItem: TodoListEntityType = {
    id: "id222222",
    title: "What to learn",
    filter: "all",
    order: 1,
    addedDate: "",
  };

  const action = addNewTodoItem(newTodoItem);

  const endItemsState = todoItemsReducer(startItemsState, action);
  const endTasksState = todoTasksReducer(stateTasksState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromItems = endItemsState[0].id;

  expect(idFromTasks).toBe(action.todoItem.id);
  expect(idFromItems).toBe(action.todoItem.id);
  expect(idFromItems).toBe(idFromTasks);
});
