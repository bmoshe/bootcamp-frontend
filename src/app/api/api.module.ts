import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    ApiService
  ]
})
export class ApiModule { }
