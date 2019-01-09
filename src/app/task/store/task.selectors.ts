import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState, TASK_STATE_NAME } from './task.state';

export const selectTaskFeature = createFeatureSelector<ITaskState>(TASK_STATE_NAME);

export const selectSortType =
  createSelector(selectTaskFeature, (state) => state.sortType);

export const selectSortOrder =
  createSelector(selectTaskFeature, (state) => state.sortOrder);
