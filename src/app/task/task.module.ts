import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/task.reducer';
import { TASK_STATE_NAME } from './store/task.state';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    TaskComponent
  ],
  exports: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(TASK_STATE_NAME, taskReducer)
  ]
})
export class TaskModule { }
