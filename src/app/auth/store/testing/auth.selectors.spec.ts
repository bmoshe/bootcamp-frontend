import { ApiRequestStatus } from '../../../api/api.request';
import { AuthStatus } from '../../auth-status.enum';
import { mockSession } from '../../testing/session.mock';
import { authReducer } from '../auth.reducer';
import {
  selectAuthLoginErrors,
  selectAuthLoginStatus,
  selectAuthSession,
  selectAuthStatus,
  selectAuthUser
} from '../auth.selectors';
import { AUTH_STATE_NAME, IAuthState } from '../auth.state';

function buildAppStateFor(state: IAuthState): any {
  return {
    [AUTH_STATE_NAME]: state
  };
}

describe('Auth Selectors', () => {
  let state: IAuthState;

  beforeEach(() => state = authReducer(undefined, { type: '@ngrx/store/init' } as any));

  describe('session', () => {
    it('returns the current session', () => {
      const session = mockSession();
      state = { ...state, session };
      const newSelect = selectAuthSession(buildAppStateFor(state));

      expect(newSelect).toEqual(session);
    });

    it('returns the current user if session is present', () => {
      const session = mockSession();
      state = { ...state, session };
      const newSelect = selectAuthUser(buildAppStateFor(state));

      expect(newSelect).toEqual(session.user);
    });

    it('returns the current user as null if no session', () => {
      state = { ...state, session: null };
      const newSelect = selectAuthUser(buildAppStateFor(state));

      expect(newSelect).toEqual(null);
    });
  });

  describe('status', () => {
    it('selects the current status', () => {
      state = { ...state, authStatus: AuthStatus.Authenticated };
      let newSelect = selectAuthStatus(buildAppStateFor(state));
      expect(newSelect).toEqual(AuthStatus.Authenticated);

      state = { ...state, authStatus: AuthStatus.Unauthenticated };
      newSelect = selectAuthStatus(buildAppStateFor(state));
      expect(newSelect).toEqual(AuthStatus.Unauthenticated);

      state = { ...state, authStatus: AuthStatus.Rehydrating };
      newSelect = selectAuthStatus(buildAppStateFor(state));
      expect(newSelect).toEqual(AuthStatus.Rehydrating);
    });
  });

  describe('login state', () => {
    it('selects the current login status', () => {
      state = { ...state, loginRequestStatus: { status: ApiRequestStatus.Success } };
      const newSelect = selectAuthLoginStatus(buildAppStateFor(state));

      expect(newSelect).toEqual(ApiRequestStatus.Success);
    });

    it('selects the login errors', () => {
      const errors = { data: { errors: "Can't login" } };
      state = {
        ...state, loginRequestStatus: {
          errors, status: ApiRequestStatus.Failure
        }
      };
      const newSelect = selectAuthLoginErrors(buildAppStateFor(state));

      expect(newSelect).toEqual(errors);
    });
  });
});
