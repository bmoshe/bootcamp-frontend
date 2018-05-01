import { CyAppComponent } from './app.component.cy';
import { CyAuthFlows } from '../auth';

export class CyAppFlows {
  appComponent;

  authFlows;

  constructor() {
    this.appComponent = new CyAppComponent();
    this.authFlows = new CyAuthFlows();
  }

  login() {
    return this.authFlows.login();
  }
}
