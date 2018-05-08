import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MockApiModule } from '../api/testing/api.module.mock';
import { AuthComponent } from './auth.component';
import { authReducer } from './store/auth.reducer';
import { AUTH_STATE_NAME } from './store/auth.state';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let component: AuthComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthComponent
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(AUTH_STATE_NAME, authReducer),
        MockApiModule
      ]
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  }));

  it('renders', () => expect(component).toBeTruthy());
});
