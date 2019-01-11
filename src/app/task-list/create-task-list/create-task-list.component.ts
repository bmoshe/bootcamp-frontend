import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { RXComponent } from '../../rx-component/rx-component';

@Component({
  selector: 'pl-create-task-list',
  templateUrl: './create-task-list.component.html',
  styleUrls: ['./create-task-list.component.scss']
})
export class CreateTaskListComponent extends RXComponent implements OnInit {
  /**
   * Here you will want to build the mechanism to create task lists
   * It should just accept a name, and when it is created, redirect the user
   * to the proper URL
   *
   * Your template should contain a text input and a submit button. A loading indicator
   * is also a bonus.
   */

  constructor(private _apollo: Apollo) {
    super();
  }

  ngOnInit(): void {

  }
}
