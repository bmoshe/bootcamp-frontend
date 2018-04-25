import { CyAppComponent } from './app.component.cy';
import { CyTaskListFlows } from '../task-list';

export class CyAppFlows {
  appComponent;
  taskListFlows;

  constructor() {
    this.appComponent = new CyAppComponent();
    this.taskListFlows = new CyTaskListFlows();
  }

  addTask(taskName) {
    return this.appComponent.taskNameInput
      .type(taskName)
      .type('{enter}');
  }

  checkTaskCount(count) {
    return this.taskListFlows.checkTaskCount(count);
  }

  checkTaskName(index, name) {
    return this.taskListFlows.checkTaskName(index, name);
  }

  hasTasks() {
    return this.taskListFlows.hasTasks();
  }

  hasNoTasks() {
    return this.taskListFlows.hasNoTasks();
  }

  deleteTask(index) {
    return this.taskListFlows.deleteTask(index);
  }
}
