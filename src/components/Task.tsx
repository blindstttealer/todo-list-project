import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import {
  removeTaskTC,
  updateTaskStatusTC,
  updateTaskTitleTC,
} from "../state/todoTasks-reducer";
import { Delete, EmojiEmotions, HeartBrokenRounded } from "@mui/icons-material";
import { EditableSpan } from "./EditableSpan";
import { useDispatch } from "react-redux";
import { TaskStatuses, TaskType } from "../models/api-models";
import { AppDispatch } from "../state/store";

type TaskPropsType = {
  todoId: string;
  task: TaskType;
};

export const Task: React.FC<TaskPropsType> = ({ task, todoId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked;
    dispatch(
      updateTaskStatusTC(
        todoId,
        task.id,
        status ? TaskStatuses.Completed : TaskStatuses.New,
      ),
    );
  };

  const removeTask = (todoId: string, taskId: string) => {
    dispatch(removeTaskTC(todoId, task.id));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTitleTC(todoId, task.id, title, task));
  };

  return (
    <div
      key={task.id}
      className={task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        color="secondary"
        onChange={onChangeHandler}
        checked={task.status === TaskStatuses.Completed}
        icon={<EmojiEmotions />}
        checkedIcon={<HeartBrokenRounded />}
      />
      <EditableSpan title={task.title} onChange={changeTaskTitle} />
      <IconButton
        onClick={() => removeTask(todoId, task.id)}
        style={{ color: "gray" }}
      >
        <Delete />
      </IconButton>
    </div>
  );
};
