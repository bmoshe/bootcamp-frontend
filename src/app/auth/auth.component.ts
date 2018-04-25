import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { IApiError } from '../api/api.error';
import { ReactiveComponent } from '../reactive-component/reactive-component';
import { IAppState } from '../store/app.state';
import { AuthLoginAction } from './store/auth.actions';
import { selectAuthLoginErrors } from './store/auth.selectors';

@Component({
  selector: 'pl-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class AuthComponent extends ReactiveComponent implements OnInit {
  email: string;
  password: string;

  loginErrors$: Observable<IApiError>;

  constructor(private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {
    this.loginErrors$ = this._store
      .select(selectAuthLoginErrors)
      .takeUntil(this._ngOnDestroy);
  }

  login(): void {
    this._store.dispatch(new AuthLoginAction(this.email, this.password));
  }
}
