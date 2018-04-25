import { ITaskState } from '../task/store/task.state';

export interface IAppState {
  tasks?: ITaskState;
}
