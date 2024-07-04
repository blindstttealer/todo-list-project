import React from "react";
import { EditableSpan } from "./EditableSpan";
import {
  removeTodoListTC,
  updateTodoListTitleTC,
} from "../state/todoItems-reducer";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

type TodoHeaderProps = {
  title: string;
  todoId: string;
};

export const TodoHeader: React.FC<TodoHeaderProps> = React.memo(
  ({ todoId, title }) => {
    const dispatch = useDispatch<AppDispatch>();

    const removeTodoList = (id: string) => {
      dispatch(removeTodoListTC(id));
    };

    const updateTitle = (title: string) => {
      dispatch(updateTodoListTitleTC(todoId, title));
    };

    return (
      <h3>
        <EditableSpan title={title} onChange={updateTitle} />
        <IconButton
          onClick={() => removeTodoList(todoId)}
          color="secondary"
          size="small"
        >
          <Delete />
        </IconButton>
      </h3>
    );
  },
);
