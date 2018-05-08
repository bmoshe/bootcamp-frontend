import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { jestCreateSpyObj } from '../../../../jest.helpers';
import { AuthService } from '../../auth.service';
import { mockSession } from '../../testing/session.mock';
import { AuthActions, AuthLoginAction, AuthLoginFailureAction, AuthLoginSuccessAction } from '../auth.actions';
import { AuthEffects } from '../auth.effects';
import { authReducer } from '../auth.reducer';
import { AUTH_STATE_NAME } from '../auth.state';

describe('AuthEffects', () => {
  let actions: ReplaySubject<Action>;
  let effects: AuthEffects;

  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_STATE_NAME, authReducer)
      ],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useValue: jestCreateSpyObj('authService', ['currentSession', 'login']) }
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  describe('loginEffect', () => {
    it('emits a success action', async(() => {
      actions = new ReplaySubject();
      actions.next(new AuthLoginAction('test@me.com', '123123123'));

      const session = mockSession();
      (authService.login as jasmine.Spy).and.returnValue(Observable.of(session));

      effects.loginEffect()
        .take(1)
        .subscribe((action: AuthLoginSuccessAction) => {
          expect(action.type).toEqual(AuthActions.LoginSuccess);
          expect(action.session).toEqual(session);
        });
    }));

    it('emits a failure action', async(() => {
      actions = new ReplaySubject();
      actions.next(new AuthLoginAction('test@me.com', '123123123'));

      const session = mockSession();
      (authService.login as jasmine.Spy).and.returnValue(Observable.throw('some error'));

      effects.loginEffect()
        .take(1)
        .subscribe((action: AuthLoginFailureAction) => {
          expect(action.type).toEqual(AuthActions.LoginFailure);
        });
    }));
  });
});
