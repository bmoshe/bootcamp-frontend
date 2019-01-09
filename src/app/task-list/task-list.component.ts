import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { RXComponent } from '../rx-component/rx-component';

@Component({
  selector: 'pl-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends RXComponent implements OnInit {
  /**
   * Here you will actually fetch the selected list based on the URL (/task-lists/list/:id),
   * as well as associated tasks with their tags
   *
   * You will want to create a query to request the list and it's child task data.
   * You will also want to create 2 observables for the sort type and order. You should pass these
   * to the query as variables, and refetch whenever they change.
   *
   * You will also need to create a mechanism to create tasks with name and list of tag ids.
   * When a task is created, you
   */

  constructor(private _apollo: Apollo) {
    super();
  }

  ngOnInit(): void {

  }
}
