import { Action } from '@ngrx/store';
import { TaskSortOrder, TaskSortType } from './task.state';

export enum TaskActions {
  UpdateSortType = '[TASK] Update Sort Type',
  UpdateSortOrder = '[TASK] Update Sort Order'
}

export class TaskUpdateSortTypeAction implements Action {
  readonly type: typeof TaskActions.UpdateSortType = TaskActions.UpdateSortType;

  constructor(readonly sortType: TaskSortType) { }
}

export class TaskUpdateSortOrderAction implements Action {
  readonly type: typeof TaskActions.UpdateSortOrder = TaskActions.UpdateSortOrder;

  constructor(readonly sortOrder: TaskSortOrder) { }
}

export type TaskAction = TaskUpdateSortTypeAction | TaskUpdateSortOrderAction;
