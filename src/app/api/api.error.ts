export interface IModelError {
  errors?: object | string;
  messages?: string[];
  index_messages?: object;
}

export interface IApiError {
  status?: number;
  data?: IModelError;
}
