import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../task';

@Component({
  selector: 'pl-task-list',
  styleUrls: ['./task-list.component.scss'],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  @Input() tasks: ITask[];
  @Output() taskComplete: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskDelete: EventEmitter<number> = new EventEmitter<number>();

  completeTask(index: number): void {
    this.taskComplete.next(index);
  }

  deleteTask(index: number): void {
    this.taskDelete.next(index);
  }
}
