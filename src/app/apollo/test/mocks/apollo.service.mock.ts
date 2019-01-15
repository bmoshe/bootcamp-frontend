import { Provider } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { jestCreateSpyObj } from '../../../../jest/jest.helpers';

export const MockedApolloProvider: Provider = {
  provide: Apollo,
  useValue: jestCreateSpyObj('apollo', ['query', 'watchQuery', 'mutate'])
};
