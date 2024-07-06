import React from "react";
import { Grid, Paper } from "@mui/material";
import { TodoList } from "./Todolist";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import { TodoListEntityType, TodoTasksType } from "../../models/api-models";

const TodoItemsList = () => {
  const todoItems = useSelector<AppRootState, Array<TodoListEntityType>>(
    (state) => state.items,
  );
  const todoTasks = useSelector<AppRootState, TodoTasksType>(
    (state) => state.tasks,
  );

  return (
    <Grid container gap={2}>
      {todoItems.length !== 0 ? (
        todoItems.map((tl) => {
          return (
            <TodoList
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={todoTasks[tl.id]}
              filter={tl.filter}
            />
          );
        })
      ) : (
        <Paper sx={{ padding: "10px 15px" }}>Нет задач</Paper>
      )}
    </Grid>
  );
};

export default TodoItemsList;
