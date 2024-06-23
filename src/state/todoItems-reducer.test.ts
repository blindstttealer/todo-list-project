import {v1} from "uuid";
import {TodoItemType} from "../App";
import {
    addNewTodoItem,
    changeTodoItemFilter,
    changeTodoItemTitle,
    removeTodoList,
    todoItemsReducer
} from "./todoItems-reducer";


test('correct todoItem should be removed', () => {
    const tasksId1 = v1();
    const tasksId2 = v1();

    const startState: Array<TodoItemType> = [
        {id: tasksId1, title: "What to learn", filter: "all"},
        {id: tasksId2, title: "What to play", filter: "completed"},
    ]

    const endState = todoItemsReducer(startState, removeTodoList(tasksId2))
    expect(endState[0].title).toBe('What to learn');
    expect(endState.length).toBe(1);
})

test('correct todoItem should be add new Item', () => {
    const tasksId1 = v1();
    const tasksId2 = v1();

    const startState: Array<TodoItemType> = [
        {id: tasksId1, title: "What to learn", filter: "all"},
        {id: tasksId2, title: "What to play", filter: "completed"},
    ]

    const newTitle = 'SomeBody once told me'

    const endState = todoItemsReducer(startState, addNewTodoItem(newTitle))

    expect(endState[2].title).toBe(newTitle);
    expect(endState.length).toBe(3);

})


test('correct todoItem should be change his title', () => {
    const tasksId1 = v1();
    const tasksId2 = v1();

    const startState: Array<TodoItemType> = [
        {id: tasksId1, title: "What to learn", filter: "all"},
        {id: tasksId2, title: "What to play", filter: "completed"},
    ]

    const newTitle = 'SomeBody once told me'

    const endState = todoItemsReducer(startState, changeTodoItemTitle(newTitle, tasksId2))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTitle)
})

test('correct todoItem should be change his filter', () => {
    const tasksId1 = v1();
    const tasksId2 = v1();

    const startState: Array<TodoItemType> = [
        {id: tasksId1, title: "What to learn", filter: "all"},
        {id: tasksId2, title: "What to play", filter: "completed"},
    ]

    const updateFilter = 'active'

    const endState = todoItemsReducer(startState, changeTodoItemFilter(tasksId2, updateFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(updateFilter)

})
