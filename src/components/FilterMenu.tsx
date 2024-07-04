import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTodoItemFilter } from "../state/todoItems-reducer";
import { Button } from "@mui/material";
import { FilterValuesType } from "../models/api-models";

type FilterMenuPropsType = {
  id: string;
};
export const FilterMenu: React.FC<FilterMenuPropsType> = React.memo(
  ({ id }) => {
    const [selected, setSelected] = useState("");
    const filterValue = ["all", "active", "completed"] as const;
    const dispatch = useDispatch();

    const onClickChangeFilterHandler = (value: FilterValuesType) => {
      setSelected(value);
      dispatch(changeTodoItemFilter(id, value));
    };

    return (
      <div style={{ display: "flex", columnGap: "5px" }}>
        {filterValue.map((value) => {
          return (
            <Button
              key={value}
              color="secondary"
              variant={value === selected ? "contained" : "outlined"}
              onClick={() => onClickChangeFilterHandler(value)}
            >
              {value}
            </Button>
          );
        })}
      </div>
    );
  },
);
