import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IApiError } from '../api/api.error';
import { RXComponent } from '../rx-component/rx-component';
import { IAppState } from '../store/app.state';
import { AuthLoginAction } from './store/auth.actions';
import { selectAuthLoginErrors } from './store/auth.selectors';

@Component({
  selector: 'pl-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class AuthComponent extends RXComponent implements OnInit {
  email: string;
  password: string;

  loginErrors$: Observable<IApiError>;

  constructor(private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {
    this.loginErrors$ = this._store
      .select(selectAuthLoginErrors)
      .pipe(takeUntil(this._ngOnDestroy));
  }

  login(): void {
    this._store.dispatch(new AuthLoginAction(this.email, this.password));
  }
}
