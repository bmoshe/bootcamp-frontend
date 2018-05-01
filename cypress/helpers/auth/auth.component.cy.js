export class CyAuthComponent {
  get authPage() {
    return cy.get('pl-auth');
  }

  get emailField() {
    return this.authPage.find('.plAuth-email');
  }

  get passwordField() {
    return this.authPage.find('.plAuth-password');
  }

  get submitBtn() {
    return this.authPage.find('.plAuth-submitBtn');
  }
}
