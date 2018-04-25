import { ApiRequestStatus, IApiRequestState } from '../../api/api.request';
import { ITask } from '../task';

export const TASK_STATE_NAME = 'tasks';

export interface ITaskState {
  tasks: Map<number, ITask>;
  taskListLoadingStatus: IApiRequestState;
  taskRequestStatuses: Map<number, IApiRequestState>;
}
