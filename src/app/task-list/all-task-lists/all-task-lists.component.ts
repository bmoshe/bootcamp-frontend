import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { RXComponent } from '../../rx-component/rx-component';

@Component({
  selector: 'pl-all-task-lists',
  templateUrl: './all-task-lists.component.html',
  styleUrls: ['./all-task-lists.component.scss']
})
export class AllTaskListsComponent extends RXComponent implements OnInit {
  /**
   * Here you will want to list all the task lists for the logged in user. It should be simple
   * with one query to get the task lists
   */

  constructor(private _apollo: Apollo) {
    super();
  }

  ngOnInit(): void {

  }
}
