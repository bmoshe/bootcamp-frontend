import { IUser } from '../user/user';

export interface ISession {
  user?: IUser;
  user_id?: number;
  token?: string;
}
