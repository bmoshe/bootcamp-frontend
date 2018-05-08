import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MockApiModule } from './api/testing/api.module.mock';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        AuthModule,
        TaskModule,
        MockApiModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('renders', () => {
    expect(component).toBeTruthy();
  });
});
