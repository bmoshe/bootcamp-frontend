import { ApiRequestStatus } from '../../api/api.request';
import { AuthStatus } from '../auth-status.enum';
import { AuthAction, AuthActions } from './auth.actions';
import { IAuthState } from './auth.state';

const DEFAULT_STATE: IAuthState = {
  authStatus: AuthStatus.Undefined,
  loginRequestStatus: { status: ApiRequestStatus.Undefined },
  session: null
};

export function authReducer(state: IAuthState = DEFAULT_STATE, action: AuthAction): IAuthState {
  switch (action.type) {
    case AuthActions.Login:
      return {
        ...state,
        authStatus: AuthStatus.Authenticating,
        loginRequestStatus: { status: ApiRequestStatus.Pending }
      };

    case AuthActions.LoginSuccess:
      return {
        ...state,
        authStatus: AuthStatus.Authenticated,
        loginRequestStatus: { status: ApiRequestStatus.Success },
        session: action.session
      };

    case AuthActions.LoginFailure:
      return {
        ...state,
        authStatus: AuthStatus.Unauthenticated,
        loginRequestStatus: { status: ApiRequestStatus.Failure, errors: action.errors }
      };

    case AuthActions.Logout:
      return {
        ...state,
        authStatus: AuthStatus.Unauthenticated,
        loginRequestStatus: { status: ApiRequestStatus.Undefined },
        session: null
      };

    case AuthActions.Rehydrate:
      return {
        ...state,
        authStatus: AuthStatus.Rehydrating
      };

    case AuthActions.RehydrateSuccess:
      return {
        ...state,
        authStatus: action.session ? AuthStatus.Authenticated : AuthStatus.Unauthenticated,
        session: action.session
      };

    default:
      return state;
  }
}
