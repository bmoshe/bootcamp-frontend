import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { RXComponent } from '../../rx-component/rx-component';

@Component({
  selector: 'pl-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent extends RXComponent {
  /**
   * This will be your task creation component. It will need to have a query to list available tags
   * for new tasks, as well as a mutation to create new tasks.
   * Successfully creating a new task should clear the form and selected tags
   *
   * The template should contain a text input, series of checkboxes for your tags, and a submit
   * button to trigger the mutation. You may also want to add a loading indicator when your mutation is
   * running
   */

  constructor(private _apollo: Apollo) {
    super();
  }

  ngOnInit(): void {

  }
}
