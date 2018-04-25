// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { IApiError } from '../../api/api.error';
import { ITask } from '../task';

export enum TaskActions {
  RequestList = '[TASK] Request List',
  RequestListSuccess = '[TASK] Request List Success',
  RequestListFailure = '[TASK] Request List Failure'
}

export class TaskRequestListAction implements Action {
  readonly type: typeof TaskActions.RequestList = TaskActions.RequestList;
}

export class TaskRequestListSuccessAction implements Action {
  readonly type: typeof TaskActions.RequestListSuccess = TaskActions.RequestListSuccess;

  constructor(public tasks: ITask[]) { }
}

export class TaskRequestListFailureAction implements Action {
  readonly type: typeof TaskActions.RequestListFailure = TaskActions.RequestListFailure;

  constructor(public errors: IApiError) { }
}

export type TaskAction
  = TaskRequestListAction
  | TaskRequestListSuccessAction
  | TaskRequestListFailureAction;

// tslint:enable:max-classes-per-file
