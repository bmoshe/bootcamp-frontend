export enum TaskSortOrder {
  Ascending = 'ascending',
  Descending = 'descending'
}

export enum TaskSortType {
  Date = 'date',
  Alpha = 'alphabetical'
}

export const TASK_STATE_NAME = 'tasks';

export interface ITaskState {
  sortType: TaskSortType;
  sortOrder: TaskSortOrder;
}
