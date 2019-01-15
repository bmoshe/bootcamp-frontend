import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response, ResponseOptions, URLSearchParams } from '@angular/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockApiService {
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return of(new Response(new ResponseOptions()));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return of(new Response(new ResponseOptions()));
  }

  searchParams(params: any): URLSearchParams {
    return new URLSearchParams();
  }
}
