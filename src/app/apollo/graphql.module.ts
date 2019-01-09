import { HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { environment } from '../../environments/environment';

const apolloFactory = (httpLink: HttpLink) => {
  const uri = `${environment.baseUrl}/api/graphql`;

  const auth = setContext((op, ctx) => {
    const token = localStorage.getItem('authToken');

    return { headers: ctx.headers.append('Authorization', `Bearer ${token}`) };
  });

  const error = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      // tslint:disable-next-line:no-console
      console.error('[APOLLO] GraphQL Errors', graphQLErrors);
    }

    if (networkError) {
      // tslint:disable-next-line:no-console
      console.error('[APOLLO] Network Error', networkError);
    }
  });

  const options = {
    errorPolicy: 'all',
    uri
  };

  const link = ApolloLink.from([auth, error, httpLink.create(options)]);

  return { cache: new InMemoryCache(), link };
};

@NgModule({
  imports: [
    ApolloModule,
    HttpLinkModule
  ],
  exports: [
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    { provide: APOLLO_OPTIONS, useFactory: apolloFactory, deps: [HttpLink] }
  ]
})
export class PlatterzGraphQLModule { }
