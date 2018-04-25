export class CyAppComponent {
  get app() {
    return cy.get('pl-root');
  }

  get taskNameInput() {
    return this.app.find('.plApp-input');
  }
}
