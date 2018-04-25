import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STATE_NAME, IAuthState } from './auth.state';

export const selectAuthFeature = createFeatureSelector<IAuthState>(AUTH_STATE_NAME);

export const selectAuthSession =
  createSelector(selectAuthFeature, (state) => state.session);

export const selectAuthUser =
  createSelector(selectAuthSession, (session) => session && session.user);

export const selectAuthStatus =
  createSelector(selectAuthFeature, (state) => state.authStatus);

export const selectAuthLogin =
  createSelector(selectAuthFeature, (state) => state.loginRequestStatus);

export const selectAuthLoginStatus =
  createSelector(selectAuthLogin, (status) => status && status.status);

export const selectAuthLoginErrors =
  createSelector(selectAuthLogin, (status) => status && status.errors);
