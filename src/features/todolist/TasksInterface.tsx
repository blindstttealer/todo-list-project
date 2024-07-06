import React from "react";

import { Task } from "./task/Task";
import { TaskType } from "../../models/api-models";

type TasksInterfaceProps = {
  tasks: Array<TaskType>;
  todoId: string;
};

export const TasksInterface: React.FC<TasksInterfaceProps> = React.memo(
  ({ todoId, tasks }) => {
    console.log(tasks, "tasks");
    return (
      <div>
        {tasks.map((task) => {
          return <Task task={task} todoId={todoId} key={task.id} />;
        })}
      </div>
    );
  },
);
