import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { IApiError } from './api/api.error';
import { AuthStatus } from './auth/auth-status.enum';
import { AuthRehydrateAction } from './auth/store/auth.actions';
import { selectAuthStatus, selectAuthUser } from './auth/store/auth.selectors';
import { ReactiveComponent } from './reactive-component/reactive-component';
import { IAppState } from './store/app.state';
import { ITask } from './task/task';
import { TaskService } from './task/task.service';
import { IUser } from './user/user';

@Component({
  selector: 'pl-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent extends ReactiveComponent implements OnInit {
  newTaskName: string;
  tasks: ITask[];
  errors: IApiError;

  user$: Observable<IUser>;
  authStatus$: Observable<AuthStatus>;
  loggedIn$: Observable<boolean>;
  authLoading$: Observable<boolean>;

  constructor(
    private _taskService: TaskService,
    private _store: Store<IAppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this._bindObservables();
    this._store.dispatch(new AuthRehydrateAction());

    this.newTaskName = '';
    this.tasks = [];

    this.user$
      .filter((user) => user != null)
      .subscribe(() => {
        this._taskService.list()
          .subscribe((taskList) => this.tasks = taskList.tasks);
      });
  }

  addTask(): void {
    this._taskService
      .save({ name: this.newTaskName })
      .subscribe(
        (task) => {
          this.tasks.unshift(task);
          this.newTaskName = '';
        },
        (errors) => this.errors = errors);
  }

  onTaskComplete(index: number): void {
    const task = this.tasks[index];

    this._taskService
      .save({ ...task, completed: true })
      .subscribe((newTask) => this.tasks[index] = newTask);
  }

  onTaskDelete(index: number): void {
    const task = this.tasks[index];

    this._taskService
      .delete(task)
      .subscribe((newTask) => this.tasks.splice(index, 1));
  }

  private _bindObservables(): void {
    this.user$ = this._store
      .select(selectAuthUser)
      .takeUntil(this._ngOnDestroy);

    this.authStatus$ = this._store
      .select(selectAuthStatus)
      .takeUntil(this._ngOnDestroy);

    this.loggedIn$ = this.authStatus$
      .map((status) => status === AuthStatus.Authenticated);

    this.authLoading$ = this.authStatus$
      .map((status) => status === AuthStatus.Rehydrating);
  }
}
