import React from "react";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { useDispatch } from "react-redux";
import { addTask } from "../state/todoTasks-reducer";
import { FilterMenu } from "./FilterMenu";
import { TasksInterface } from "./TasksInterface";
import { TodoHeader } from "./TodoHeader";
import { getFilteredTasks } from "../utils/getFilteredTasks";
import { Grid, Paper } from "@mui/material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
};

export const TodoList = (props: PropsType) => {
  const dispatch = useDispatch();

  const filteredTasksByFilterValue = React.useMemo(() => {
    return getFilteredTasks(props.tasks, props.filter);
  }, [props.filter, props.tasks]);

  const addTaskHandler = React.useCallback(
    (title: string) => {
      dispatch(addTask(title, props.id));
    },
    [dispatch, props.id],
  );

  return (
    <Grid>
      <Paper sx={{ padding: "5px 15px" }}>
        <TodoHeader title={props.title} todoId={props.id} />
        <AddItemForm addItem={addTaskHandler} />
        <TasksInterface tasks={filteredTasksByFilterValue} todoId={props.id} />
        <FilterMenu id={props.id} />
      </Paper>
    </Grid>
  );
};
