import { IUser } from '../user';

export function mockUser(overrides: Partial<IUser> = {}): IUser {
  const user = {
    email: 'test@platterz.ca',
    id: 1
  };

  return Object.assign(user, overrides);
}
