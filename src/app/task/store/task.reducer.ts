import { cloneDeep } from 'lodash';

import { ApiRequestStatus } from '../../api/api.request';

import { TaskAction, TaskActions } from './task.actions';
import { ITaskState } from './task.state';

const DEFAULT_STATE: ITaskState = {
  taskListLoadingStatus: { status: ApiRequestStatus.Undefined },
  taskRequestStatuses: new Map(),
  tasks: new Map()
};

export function taskReducer(state: ITaskState = DEFAULT_STATE, action: TaskAction): ITaskState {
  switch (action.type) {
    case TaskActions.RequestList:
      return {
        ...state,
        taskListLoadingStatus: { status: ApiRequestStatus.Pending }
      };

    case TaskActions.RequestListSuccess:
      const newTasks = cloneDeep(new Map(state.tasks));
      action.tasks.forEach((task) => newTasks.set(task.id, task));

      return {
        ...state,
        taskListLoadingStatus: { status: ApiRequestStatus.Success },
        tasks: newTasks
      };

    case TaskActions.RequestListFailure:
      return {
        ...state,
        taskListLoadingStatus: {
          errors: action.errors,
          status: ApiRequestStatus.Failure
        }
      };

    default:
      return state;
  }
}
