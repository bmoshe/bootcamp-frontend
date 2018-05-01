import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

import { IApiError } from './api.error';

@Injectable()
export class ApiService {
  constructor(private http: Http) { }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http
      .get(this._buildUrl(url), this._buildOptions(options))
      .catch(this.errorHandler) as Observable<Response>;
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http
      .post(this._buildUrl(url), body, this._buildOptions(options))
      .catch(this.errorHandler) as Observable<Response>;
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http
      .put(this._buildUrl(url), body, this._buildOptions(options))
      .catch(this.errorHandler) as Observable<Response>;
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.http
      .patch(this._buildUrl(url), body, this._buildOptions(options))
      .catch(this.errorHandler) as Observable<Response>;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http
      .delete(this._buildUrl(url), this._buildOptions(options))
      .catch(this.errorHandler) as Observable<Response>;
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http
      .options(this._buildUrl(url), this._buildOptions(options))
      .catch(this.errorHandler) as Observable<Response>;
  }

  errorHandler(error: any): Observable<IApiError> {
    const errors: IApiError = {
      data: error.json(),
      status: error.status
    };

    return Observable.throw(errors);
  }

  private _buildUrl(url: string): string {
    return `${environment.baseUrl}/${url}`;
  }

  private _buildOptions(options: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = {};
    }
    this._setContentTypeHeader(options);

    return options;
  }

  private _setContentTypeHeader(request: Request | RequestOptionsArgs): Request | RequestOptionsArgs {
    if (request == null) {
      return null;
    }

    if (request.headers == null) {
      request.headers = new Headers();
    }

    if (!request.headers.has('Content-Type')) {
      request.headers.append('Content-Type', 'application/json');
    }

    if (!request.headers.has('Session-Token')) {
      request.headers.append('Session-Token', localStorage.getItem('authToken'));
    }

    return request;
  }
}
