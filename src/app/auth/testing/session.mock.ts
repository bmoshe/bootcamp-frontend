import { mockUser } from '../../user/testing/user.mock';
import { ISession } from '../session';

export function mockSession(overrides: ISession = {}): ISession {
  const user = mockUser();

  const session = { user, user_id: user.id, token: 'some-token' };

  return Object.assign(session, overrides);
}
