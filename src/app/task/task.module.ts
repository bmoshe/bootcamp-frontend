import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskEffects } from './store/task.effects';
import { taskReducer } from './store/task.reducer';
import { TASK_STATE_NAME } from './store/task.state';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
    TaskListComponent
  ],
  exports: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(TASK_STATE_NAME, taskReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
