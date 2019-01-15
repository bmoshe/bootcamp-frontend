import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskModule } from '../task/task.module';
import { AllTaskListsComponent } from './all-task-lists/all-task-lists.component';
import { CreateTaskListComponent } from './create-task-list/create-task-list.component';
import { NoTaskListComponent } from './no-task-list/no-task-list.component';
import { TaskListComponent } from './task-list.component';
import { TaskListsComponent } from './task-lists/task-lists.component';

@NgModule({
  declarations: [
    AllTaskListsComponent,
    CreateTaskListComponent,
    TaskListsComponent,
    TaskListComponent,
    NoTaskListComponent
  ],
  exports: [
    AllTaskListsComponent,
    CreateTaskListComponent,
    TaskListsComponent,
    TaskListComponent,
    NoTaskListComponent
  ],
  entryComponents: [
    CreateTaskListComponent,
    TaskListsComponent,
    TaskListComponent,
    NoTaskListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TaskModule
  ]
})
export class TaskListModule { }
