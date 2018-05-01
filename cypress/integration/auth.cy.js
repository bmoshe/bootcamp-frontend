import { CyAppFlows } from '../helpers/app';

describe('Auth', () => {
  const appFlows = new CyAppFlows();

  beforeEach(() => cy.visit('/'));

  it('logins', () => {
    appFlows.login();
  });
});
