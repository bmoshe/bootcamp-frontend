import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { RXComponent } from '../rx-component/rx-component';

@Component({
  selector: 'pl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent extends RXComponent {
  /**
   * This will be your task display component. It should have functionality to delete and mark
   * the task as complete/incomplete.
   */

  constructor(private _apollo: Apollo) {
    super();
  }

  ngOnInit(): void {

  }
}
