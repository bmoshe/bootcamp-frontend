import { CyAuthComponent } from './auth.component.cy';

export class CyAuthFlows {
  authComponent;

  constructor() {
    this.authComponent = new CyAuthComponent();
  }

  login() {
    return this.authComponent.emailField.type('test@platterz.ca')
      .then(() => this.authComponent.passwordField.type('password'))
      .then(() => this.authComponent.submitBtn.click())
      .then(() => this.authComponent.authPage.should('not.exist'));
  }
}
