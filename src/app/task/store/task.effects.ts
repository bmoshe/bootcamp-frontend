import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { TaskService } from '../task.service';

import {
  TaskAction,
  TaskActions,
  TaskRequestListAction,
  TaskRequestListFailureAction,
  TaskRequestListSuccessAction
} from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(
    private _taskService: TaskService,
    private _actions: Actions
  ) { }

  @Effect()
  requestTaskListEffect(): Observable<TaskAction> {
    return this._actions
      .ofType<TaskRequestListAction>(TaskActions.RequestList)
      .switchMap((action) => {
        return this._taskService.list()
          .map((taskList) => taskList.tasks)
          .map((tasks) => new TaskRequestListSuccessAction(tasks))
          .catch((errors) => [new TaskRequestListFailureAction(errors)]);
      });
  }
}
