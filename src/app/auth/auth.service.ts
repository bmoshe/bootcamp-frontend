import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../api/api.service';
import { ISession } from './session';

@Injectable()
export class AuthService {
  constructor(private _apiService: ApiService) { }

  login(email: string, password: string): Observable<ISession> {
    return this._apiService
      .post('session', { email, password })
      .map((response) => response.json().session);
  }

  currentSession(): Observable<ISession> {
    return this._apiService
      .get('session')
      .map((response) => response.json().session);
  }
}
