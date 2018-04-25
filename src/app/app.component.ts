import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApiError } from './api/api.error';
import { IAppState } from './store/app.state';
import { ITask } from './task/task';
import { TaskService } from './task/task.service';

@Component({
  selector: 'pl-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  newTaskName: string;
  tasks: ITask[];
  errors: IApiError;

  constructor(
    private _taskService: TaskService,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.newTaskName = '';
    this.tasks = [];

    this._taskService.list()
      .subscribe((taskList) => this.tasks = taskList.tasks);
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
}
