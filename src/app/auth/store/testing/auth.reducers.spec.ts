import { ApiRequestStatus } from '../../../api/api.request';
import { AuthStatus } from '../../auth-status.enum';
import { mockSession } from '../../testing/session.mock';
import {
  AuthLoginAction,
  AuthLoginFailureAction,
  AuthLoginSuccessAction,
  AuthRehydrateAction,
  AuthRehydrateSuccessAction
} from '../auth.actions';
import { authReducer } from '../auth.reducer';
import { IAuthState } from '../auth.state';

describe('authReducer', () => {
  let initialState: IAuthState, newState: IAuthState;

  beforeEach(() => {
    initialState = authReducer(undefined, { type: '@ngrx/store/init' } as any);
  });

  describe('login', () => {
    it('sets the auth status to authenticating and pending on request', () => {
      newState = authReducer(initialState, new AuthLoginAction('test@me.com', '123123123'));

      expect(newState.authStatus).toEqual(AuthStatus.Authenticating);
      expect(newState.loginRequestStatus.status).toEqual(ApiRequestStatus.Pending);
    });

    it('sets the auth status to authenticated and success on success', () => {
      newState = authReducer(initialState, new AuthLoginSuccessAction(mockSession()));

      expect(newState.authStatus).toEqual(AuthStatus.Authenticated);
      expect(newState.loginRequestStatus.status).toEqual(ApiRequestStatus.Success);
    });

    it('sets the auth status to unauthenticated and failure on failure', () => {
      newState = authReducer(initialState, new AuthLoginFailureAction({ data: { errors: 'some error' } }));

      expect(newState.authStatus).toEqual(AuthStatus.Unauthenticated);
      expect(newState.loginRequestStatus.status).toEqual(ApiRequestStatus.Failure);
    });
  });

  describe('rehydrate', () => {
    it('sets the auth status to rehydrating on request', () => {
      newState = authReducer(initialState, new AuthRehydrateAction());

      expect(newState.authStatus).toEqual(AuthStatus.Rehydrating);
    });

    it('sets the status to authenticated on success', () => {
      newState = authReducer(initialState, new AuthRehydrateSuccessAction(mockSession()));

      expect(newState.authStatus).toEqual(AuthStatus.Authenticated);
    });

    it('sets the status to unauthenticated on failure', () => {
      newState = authReducer(initialState, new AuthRehydrateSuccessAction(null));

      expect(newState.authStatus).toEqual(AuthStatus.Unauthenticated);
    });
  });
});
