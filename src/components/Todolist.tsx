import React, { useEffect } from "react";
import { AddItemForm } from "./AddItemForm";
import { useDispatch } from "react-redux";
import { createTaskTC, getTasksTC } from "../state/todoTasks-reducer";
import { FilterMenu } from "./FilterMenu";
import { TasksInterface } from "./TasksInterface";
import { TodoHeader } from "./TodoHeader";
import { getFilteredTasks } from "../utils/getFilteredTasks";
import { Grid, Paper } from "@mui/material";
import { FilterValuesType, TaskType } from "../models/api-models";
import { AppDispatch } from "../state/store";

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
};

export const TodoList = (props: PropsType) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasksTC(props.id));
  }, []);

  const filteredTasksByFilterValue = React.useMemo(() => {
    return getFilteredTasks(props.tasks, props.filter);
  }, [props.filter, props.tasks]);

  const addTask = React.useCallback(
    (title: string) => {
      dispatch(createTaskTC(props.id, title));
    },
    [dispatch, props.id],
  );

  return (
    <Grid>
      <Paper sx={{ padding: "5px 15px" }}>
        <TodoHeader title={props.title} todoId={props.id} />
        <AddItemForm addItem={addTask} />
        <TasksInterface tasks={filteredTasksByFilterValue} todoId={props.id} />
        <FilterMenu id={props.id} />
      </Paper>
    </Grid>
  );
};
