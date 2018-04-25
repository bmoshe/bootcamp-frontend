export class CyTaskListComponent {
  get taskList() {
    return cy.get('pl-task-list');
  }

  get tasks() {
    return this.taskList.find('.plTaskList-task');
  }

  get deleteTaskBtns() {
    return this.tasks.find('.plTaskList-deleteBtn');
  }
}
