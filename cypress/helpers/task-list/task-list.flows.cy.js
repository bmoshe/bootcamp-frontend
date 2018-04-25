import { CyTaskListComponent } from './task-list.component.cy';

export class CyTaskListFlows {
  taskListComponent;

  constructor() {
    this.taskListComponent = new CyTaskListComponent();
  }

  checkTaskCount(count) {
    return this.taskListComponent.tasks.its('length').should('eq', count);
  }

  checkTaskName(index, name) {
    return this.taskListComponent.tasks
      .eq(index)
      .should('contain', name);
  }

  hasTasks() {
    return this.taskListComponent.tasks.should('exist');
  }

  hasNoTasks() {
    return this.taskListComponent.tasks.should('not.exist');
  }

  deleteTask(index) {
    return this.taskListComponent.deleteTaskBtns.eq(index).click();
  }
}
