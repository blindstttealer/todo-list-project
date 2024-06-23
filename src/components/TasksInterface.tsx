import React from "react";
import { TaskType } from "./Todolist";
import { Task } from "./Task";

type TasksInterfaceProps = {
  tasks: Array<TaskType>;
  todoId: string;
};

export const TasksInterface: React.FC<TasksInterfaceProps> = React.memo(
  ({ todoId, tasks }) => {
    return (
      <div>
        {tasks.map((task) => {
          return <Task {...task} todoId={todoId} key={task.id} />;
        })}
      </div>
    );
  },
);
