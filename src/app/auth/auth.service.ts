import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { ISession } from './session';

@Injectable()
export class AuthService {
  constructor(private _apiService: ApiService) { }

  login(email: string, password: string): Observable<ISession> {
    return this._apiService
      .post('session', { email, password })
      .pipe(map((response) => response.json().session));
  }

  currentSession(): Observable<ISession> {
    return this._apiService
      .get('session')
      .pipe(map((response) => response.json().session));
  }
}
