import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { IAppState } from '../store/app.state';
import { AuthStatus } from './auth-status.enum';
import { selectAuthStatus } from './store/auth.selectors';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  constructor(
    private _store: Store<IAppState>,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this._store.select(selectAuthStatus)
      .pipe(
        filter((status) => [AuthStatus.Authenticated, AuthStatus.Unauthenticated].includes(status)),
        take(1),
        map((status) => status === AuthStatus.Unauthenticated ? true : this._router.parseUrl('/task-lists')));
  }
}
