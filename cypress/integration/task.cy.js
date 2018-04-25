import { CyAppFlows, CyAppSeeds } from '../helpers/app';
import { CyTaskListFlows } from '../helpers/task-list';

describe('Task List', () => {
  const appFlows = new CyAppFlows();
  const appSeeds = new CyAppSeeds();

  before(() => appSeeds.resetTasks());

  beforeEach(() => cy.visit('/'));

  it('adds a task', () => {
    const name = 'Test Task';

    appFlows.addTask(name)
      .then(() => appFlows.checkTaskCount(1))
      .then(() => appFlows.checkTaskName(0, name));
  });

  it('deletes a task', () => {
    appFlows.hasTasks()
      .then(() => appFlows.deleteTask(0))
      .then(() => appFlows.hasNoTasks());
  });
});
