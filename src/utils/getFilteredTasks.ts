import { FilterValuesType, TaskStatuses, TaskType } from "../models/api-models";

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
        return task.status === TaskStatuses.Completed;
      case FilterType.ACTIVE:
        return task.status === TaskStatuses.New;
      default:
        return task;
    }
  });
};
