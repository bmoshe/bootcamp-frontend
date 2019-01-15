import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApiError } from './api/api.error';
import { AuthStatus } from './auth/auth-status.enum';
import { AuthRehydrateAction } from './auth/store/auth.actions';
import { RXComponent } from './rx-component/rx-component';
import { IAppState } from './store/app.state';
import { IUser } from './user/user';

@Component({
  selector: 'pl-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent extends RXComponent implements OnInit {
  constructor(private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {
    this._store.dispatch(new AuthRehydrateAction());
  }
}
