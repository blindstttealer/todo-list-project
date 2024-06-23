import { TaskType } from "../components/Todolist";
import { FilterValuesType } from "../App";

enum FilterType {
  COMPLETED = "completed",
  ACTIVE = "active",
}

export const getFilteredTasks = (
  tasks: TaskType[],
  filter: FilterValuesType,
) => {
  return tasks.filter((task) => {
    switch (filter) {
      case FilterType.COMPLETED:
        return task.isDone;
      case FilterType.ACTIVE:
        return !task.isDone;
      default:
        return task;
    }
  });
};
