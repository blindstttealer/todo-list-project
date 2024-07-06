import "./App.css";
import { AddItemForm } from "./components/add-item-form/AddItemForm";
import { Container, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { createTodoItem, getTodoListsTC } from "./state/todoItems-reducer";
import { HeaderMenu } from "./features/header-menu/HeaderMenu";
import React, { useEffect } from "react";
import TodoItemsList from "./features/todolist/TodoItemsList";
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
  }, [dispatch]);

  return (
    <div className="App">
      <HeaderMenu />
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
