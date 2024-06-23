import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import {
  changeStatus,
  changeTodoTaskTitle,
  removeTask,
} from "../state/todoTasks-reducer";
import { Delete, EmojiEmotions, HeartBrokenRounded } from "@mui/icons-material";
import { EditableSpan } from "./EditableSpan";
import { useDispatch } from "react-redux";

type TaskPropsType = {
  id: string;
  isDone: boolean;
  title: string;
  todoId: string;
};

export const Task: React.FC<TaskPropsType> = ({
  id,
  isDone,
  title,
  todoId,
}) => {
  const dispatch = useDispatch();
  return (
    <div key={id} className={isDone ? "is-done" : ""}>
      <Checkbox
        color="secondary"
        onChange={(e) =>
          dispatch(changeStatus(id, todoId, e.currentTarget.checked))
        }
        checked={isDone}
        icon={<EmojiEmotions />}
        checkedIcon={<HeartBrokenRounded />}
      />
      <EditableSpan
        title={title}
        onChange={(title) => dispatch(changeTodoTaskTitle(title, todoId, id))}
      />
      <IconButton
        onClick={() => dispatch(removeTask(id, todoId))}
        style={{ color: "gray" }}
      >
        <Delete />
      </IconButton>
    </div>
  );
};
