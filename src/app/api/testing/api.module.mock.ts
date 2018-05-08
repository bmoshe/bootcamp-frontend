import { NgModule } from '@angular/core';
import { ApiService } from '../api.service';
import { MockApiService } from './api.service.mock';

@NgModule({
  providers: [
    { provide: ApiService, useClass: MockApiService }
  ]
})
export class MockApiModule { }
