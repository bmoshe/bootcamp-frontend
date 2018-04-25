import { Action } from '@ngrx/store';
import { IApiError } from '../../api/api.error';
import { ISession } from '../session';

export enum AuthActions {
  Login = '[AUTH] Login',
  LoginSuccess = '[AUTH] Login Success',
  LoginFailure = '[AUTH] Login Failure',

  Rehydrate = '[AUTH] Rehydrate',
  RehydrateSuccess = '[AUTH] Rehydrate Success',

  Logout = '[AUTH] Logout'
}

export class AuthLoginAction implements Action {
  readonly type: typeof AuthActions.Login = AuthActions.Login;

  constructor(public email: string, public password: string) { }
}

export class AuthLoginSuccessAction implements Action {
  readonly type: typeof AuthActions.LoginSuccess = AuthActions.LoginSuccess;

  constructor(public session: ISession) { }
}

export class AuthLoginFailureAction implements Action {
  readonly type: typeof AuthActions.LoginFailure = AuthActions.LoginFailure;

  constructor(public errors: IApiError) { }
}

export class AuthRehydrateAction implements Action {
  readonly type: typeof AuthActions.Rehydrate = AuthActions.Rehydrate;
}

export class AuthRehydrateSuccessAction implements Action {
  readonly type: typeof AuthActions.RehydrateSuccess = AuthActions.RehydrateSuccess;

  constructor(public session: ISession) { }
}

export class AuthLogoutAction implements Action {
  readonly type: typeof AuthActions.Logout = AuthActions.Logout;
}

export type AuthAction
  = AuthLoginAction
  | AuthLoginSuccessAction
  | AuthLoginFailureAction
  | AuthRehydrateAction
  | AuthRehydrateSuccessAction
  | AuthLogoutAction;
