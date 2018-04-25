import { IApiError } from './api.error';

export enum ApiRequestStatus {
  Pending = 'pending',
  Success = 'success',
  Failure = 'failure',
  Undefined = 'undefined'
}

export interface IApiRequestState {
  status: ApiRequestStatus;
  errors?: IApiError;
}
