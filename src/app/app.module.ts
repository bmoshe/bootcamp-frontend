import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApiModule } from './api/api.module';

import { PlatterzGraphQLModule } from './apollo/graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TaskListModule } from './task-list/task-list.module';
import { TaskModule } from './task/task.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([]),
    ApiModule,
    AuthModule,
    TaskModule,
    TaskListModule,
    PlatterzGraphQLModule
  ],
  providers: []
})
export class AppModule { }
