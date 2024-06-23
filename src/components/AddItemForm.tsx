import { Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const validationField = () => {
    let isValid = true;
    if (title.trim() === "" || title.trim() === "fuck") {
      setError("Title is required");
      isValid = false;
    }
    return isValid;
  };

  const onClickAddHandler = () => {
    const isValid = validationField();
    if (isValid) {
      props.addItem(title);
      setTitle("");
    }
  };

  const onKeyAddHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const isValid = validationField();

    if (isValid) {
      if (e.key === "Enter") {
        props.addItem(title);
        setTitle("");
      }
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setTitle(e.target.value);
  };

  return (
    <div>
      <TextField
        label={"Type value"}
        color="secondary"
        error={!!error}
        type="text"
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyAddHandler}
        helperText={error}
      />
      <IconButton onClick={onClickAddHandler}>
        <Add color="secondary" />
      </IconButton>
    </div>
  );
});
