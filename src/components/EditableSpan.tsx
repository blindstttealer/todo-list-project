import { TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState(props.title);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  };

  return editMode ? (
    <TextField
      color="secondary"
      variant="standard"
      size="small"
      value={title}
      onChange={onChangeHandler}
      onBlur={activateViewMode}
      onKeyDown={onKeyDownHandler}
      type="text"
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
