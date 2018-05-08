import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MockApiService {
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.of(new Response(new ResponseOptions()));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.of(new Response(new ResponseOptions()));
  }

  searchParams(params: any): URLSearchParams {
    return new URLSearchParams();
  }
}
