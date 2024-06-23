import "./App.css";
import { TaskType, TodoList } from "./components/Todolist";
import { AddItemForm } from "./components/AddItemForm";
import { Container, Grid, Paper } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addNewTodoItem } from "./state/todoItems-reducer";
import { ButtonAppBar } from "./components/ButtonAppBar";
import React, { useEffect, useState } from "react";
import TodoItemsList from "./components/TodoItemsList";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoItemType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TodoTasksType = {
  [key: string]: TaskType[];
};

function App() {
  const dispatch = useDispatch();
  const addNewTodoItemCallback = React.useCallback(
    (title: string) => {
      dispatch(addNewTodoItem(title));
    },
    [dispatch],
  );

  return (
    <div className="App">
      <ButtonAppBar />
      <Container>
        <Grid style={{ marginBottom: "20px" }} container>
          <AddItemForm addItem={addNewTodoItemCallback} />
        </Grid>
        <TodoItemsList />
      </Container>
    </div>
  );
}

export default App;
