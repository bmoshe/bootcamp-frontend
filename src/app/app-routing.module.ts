import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { UnauthenticatedGuard } from './auth/unauthenticated.guard';
import { CreateTaskListComponent } from './task-list/create-task-list/create-task-list.component';
import { NoTaskListComponent } from './task-list/no-task-list/no-task-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskListsComponent } from './task-list/task-lists/task-lists.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'task-lists',
    component: TaskListsComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      { path: '', component: NoTaskListComponent },
      { path: 'create', component: CreateTaskListComponent },
      { path: 'list/:id', component: TaskListComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticatedGuard,
    UnauthenticatedGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
