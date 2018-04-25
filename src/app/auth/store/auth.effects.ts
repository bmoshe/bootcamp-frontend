import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
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
      .switchMap((action) => {
        return this._authService
          .login(action.email, action.password)
          .do((session) => localStorage.setItem('authToken', session.token))
          .map((session) => new AuthLoginSuccessAction(session))
          .catch((errors) => [new AuthLoginFailureAction(errors)]);
      });
  }

  @Effect()
  rehydrateEffect(): Observable<AuthAction> {
    return this._actions
      .ofType<AuthRehydrateAction>(AuthActions.Rehydrate)
      .switchMap((action) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
          return Observable.of(new AuthRehydrateSuccessAction(null));
        }

        return this._authService
          .sessionForToken(token)
          .do(() => localStorage.setItem('authToken', token))
          .map((session) => new AuthRehydrateSuccessAction(session))
          .catch(() => [new AuthRehydrateSuccessAction(null)]);
      });
  }
}
