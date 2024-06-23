import React from "react";
import { EditableSpan } from "./EditableSpan";
import {
  changeTodoItemTitle,
  removeTodoList,
} from "../state/todoItems-reducer";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";

type TodoHeaderProps = {
  title: string;
  todoId: string;
};

export const TodoHeader: React.FC<TodoHeaderProps> = React.memo(
  ({ todoId, title }) => {
    const dispatch = useDispatch();

    return (
      <h3>
        <EditableSpan
          title={title}
          onChange={(title) => dispatch(changeTodoItemTitle(title, todoId))}
        />
        <IconButton
          onClick={() => dispatch(removeTodoList(todoId))}
          color="secondary"
          size="small"
        >
          <Delete />
        </IconButton>
      </h3>
    );
  },
);
