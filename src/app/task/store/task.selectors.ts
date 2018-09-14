import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState, TASK_STATE_NAME } from './task.state';

export const selectTaskFeature = createFeatureSelector<ITaskState>(TASK_STATE_NAME);

export const selectAllTasks =
  createSelector(selectTaskFeature, (state) => Array.from(state.tasks.values()));

export const selectTasks = (ids: number[]) =>
  createSelector(selectTaskFeature, (state) => ids.map((id) => state.tasks.get(id)));

export const selectTask = (id: number) =>
  createSelector(selectTaskFeature, (state) => state.tasks.get(id));
