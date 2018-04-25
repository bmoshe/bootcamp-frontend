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

  sessionForToken(token: string): Observable<ISession> {
    return this._apiService
      .get(`session/${token}`)
      .map((response) => response.json().session);
  }
}
