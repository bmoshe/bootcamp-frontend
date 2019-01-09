import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthRehydrateAction, AuthRehydrateSuccessAction } from './auth.actions';
import {
  AuthAction,
  AuthActions,
  AuthLoginAction,
  AuthLoginFailureAction,
  AuthLoginSuccessAction
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions: Actions,
    private _authService: AuthService
  ) { }

  @Effect()
  loginEffect(): Observable<AuthAction> {
    return this._actions
      .ofType<AuthLoginAction>(AuthActions.Login)
      .pipe(switchMap((action) => {
        return this._authService
          .login(action.email, action.password)
          .pipe(
            tap((session) => localStorage.setItem('authToken', session.token)),
            map((session) => new AuthLoginSuccessAction(session)),
            catchError((errors) => [new AuthLoginFailureAction(errors)]));
      }));
  }

  @Effect()
  rehydrateEffect(): Observable<AuthAction> {
    return this._actions
      .ofType<AuthRehydrateAction>(AuthActions.Rehydrate)
      .pipe(switchMap((action) => {
        return this._authService
          .currentSession()
          .pipe(
            tap((session) => localStorage.setItem('authToken', session.token)),
            map((session) => new AuthRehydrateSuccessAction(session)),
            catchError(() => [new AuthRehydrateSuccessAction(null)]));
      }));
  }
}
