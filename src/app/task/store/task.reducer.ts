import { TaskAction, TaskActions } from './task.actions';
import { ITaskState, TaskSortOrder, TaskSortType } from './task.state';

const DEFAULT_STATE: ITaskState = {
  sortType: TaskSortType.Date,
  sortOrder: TaskSortOrder.Descending
};

export function taskReducer(state: ITaskState = DEFAULT_STATE, action: TaskAction): ITaskState {
  switch (action.type) {
    case TaskActions.UpdateSortOrder:
      return { ...state, sortOrder: action.sortOrder };

    case TaskActions.UpdateSortType:
      return { ...state, sortType: action.sortType };

    default:
      return state;
  }
}
