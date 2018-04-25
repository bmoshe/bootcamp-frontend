import { IApiError } from '../../api/api.error';
import { IApiRequestState } from '../../api/api.request';
import { AuthStatus } from '../auth-status.enum';
import { ISession } from '../session';

export const AUTH_STATE_NAME = 'auth';

export interface IAuthState {
  session: ISession;
  loginRequestStatus: IApiRequestState;
  authStatus: AuthStatus;
}
