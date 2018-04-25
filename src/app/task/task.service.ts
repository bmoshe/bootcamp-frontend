import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api/api.service';
import { ITask, ITaskList } from './task';

@Injectable()
export class TaskService {
  constructor(private _apiService: ApiService) { }

  list(): Observable<ITaskList> {
    return this._apiService
      .get('tasks')
      .map((response) => response.json());
  }

  save(task: Partial<ITask>): Observable<ITask> {
    return task.id ? this._update(task) : this._create(task);
  }

  delete(task: ITask): Observable<ITask> {
    return this._apiService
      .delete(`tasks/${task.id}`)
      .map(() => task);
  }

  private _create(task: Partial<ITask>): Observable<ITask> {
    return this._apiService
      .post('tasks', { task })
      .map((response) => response.json().task);
  }

  private _update(task: Partial<ITask>): Observable<ITask> {
    return this._apiService
      .patch(`tasks/${task.id}`, { task })
      .map((response) => response.json().task);
  }
}
