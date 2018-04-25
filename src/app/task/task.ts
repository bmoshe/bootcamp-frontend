import { IMeta } from '../api/meta';

export interface ITask {
  id: number;
  name: string;
  create_at: Date;
  updated_at: Date;
  completed_at: Date;
  completed: boolean;
}

export interface ITaskList {
  tasks: ITask[];
  meta: IMeta;
}
