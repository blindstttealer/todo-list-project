import "./App.css";
import { AddItemForm } from "./components/AddItemForm";
import { Container, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addNewTodoItem,
  createTodoItem,
  getTodoListsTC,
} from "./state/todoItems-reducer";
import { ButtonAppBar } from "./components/ButtonAppBar";
import React, { useEffect, useState } from "react";
import TodoItemsList from "./components/TodoItemsList";
import { AppDispatch } from "./state/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const addNewTodoItemCallback = React.useCallback(
    (title: string) => {
      dispatch(createTodoItem(title));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getTodoListsTC());
  }, []);

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
