import { IAuthState } from '../auth/store/auth.state';
import { ITaskState } from '../task/store/task.state';

export interface IAppState {
  tasks?: ITaskState;
  auth?: IAuthState;
}
