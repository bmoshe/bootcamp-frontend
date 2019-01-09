# NGRX TODO App (Frontend)

### Goals

The goal of this task is to introduce several concepts that are used heavily in all Angular 7+ portions of our front-end applications:

- Observables
- NGRX
  - Actions
  - Reducers
  - Effects
- GraphQL
  - Queries
  - Mutations
  - Caching with the Apollo Client
- Routing
- BEM Styling
- Tests with Jest
- Integration Tests with Cypress

### App Specifications

- Have an input for users to enter their tasks
  - Allow tagging new tasks with user-defined names	
- Have many task lists to users to organize their tasks
  - Allow navigation between task lists
- Allow users to delete their entered tasks
- Allow users to mark their tasks as complete
- Tasks should show:
  - The task name
  - When it was created/marked complete (one or the other)
  - The task should have a strikethrough if completed
- Allow tasks to be sorted:
  - Alphabetically
  - By created date
  - Completed tasks are always on the bottom of the list!

##### BONUS

- Allow users to move tasks from one list to another
- Animations with `@angular/animations`
- Filtering tasks by tag type(s)

### Getting Started

##### VSCode Settings

First, install VSCode (if you haven't already).

Here is a list of extensions to get you started:

```
Angular.ng-template
CoenraadS.bracket-pair-colorizer
CraigMaslowski.erb
Equinusocio.vsc-material-theme
Mikael.Angular-BeastCode
PeterJausovec.vscode-docker
christian-kohler.path-intellisense
codezombiech.gitignore
eamodio.gitlens
eg2.tslint
glen-84.sass-lint
mikestead.dotenv
pmneo.tsimporter
rbbit.typescript-hero
robertohuertasm.vscode-icons
waderyan.gitblame
```

You can also setup the workspace settings (open with `cmd` + `,`):

```json
{
  "files.insertFinalNewline": true,
  "editor.tabSize": 2,
  "editor.tabCompletion": true,
  "files.trimTrailingWhitespace": true,
  "html.format.endWithNewline": true,
  "ruby.lint": {
    "rubocop": true
  },
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "[html]": {
    "editor.formatOnPaste": false,
    "editor.formatOnSave": false
  },
  "html.format.wrapLineLength": 100,
  "html.format.maxPreserveNewLines": 1,
  "vsicons.presets.angular": true
}

```

Feel free to customize your user settings outside of the workspace settings above.

##### Getting The App Ready

First, fork the `platterz/bootcamp-frontend` app.

Then run the following:

```bash
# Clone the starter application
$ git clone [URL HERE]
$ cd platterz-todo
# Checkout a branch to start working
$ git checkout -b FNAME-LNAME-bootcamp
# Install dependencies
$ npm install
# Start the development server
$ ng serve
```

You can then navigate to http://localhost:4200 for your new app!

### What do we have here...

When you load up the app, you'll find a small subset of the functionality required. You are able login and  create a new list, but that's it. You will need to build the rest of the functionality yourself.

We have also already included authentication for your app, so no need to worry there!

#### Apollo Client

Apollo Client is a set of libraries used to interface with GraphQL. It includes the actual API service and a caching mechanism for requests made to our API.

The Angular library for Apollo is Observable based, which nicely integrates into our existing patterns and workflows, and helps us keep our applications performant.

The way we make sure that our front end is through the use of a `schema.json` file. It holds all the query, mutation, and type definitions on your backend, so you can verify your GraphQL code easily. Apollo also provides tooling to read your queries and the schema, and generate TypeScript definitions that you can use in your code to stay type-safe.

There are 3 main functions that you will use in your application:

- `query`: Make a single query request to the backend and return data as it is
- `watchQuery`: Make a query request to the backend, but also watch for changes in the cache and propagate
- `mutate`: Make a mutation request to the backend to change data, you can also trigger updates to queries on success

Components that make use of the Apollo client function like regular components, with an added `graphql` file to store query and mutation definitions. Below is an example of a component that lists some records and watches for changes:

```typescript
# hero-list.component.ts
@Component({
  selector: 'pl-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent extends RXComponent implements OnInit {
  query: QueryRef<HeroList>;

  heroes$: Observable<HeroListHero>;
  
  constructor(private _apollo: Apollo) {}
  
  ngOnInit(): void {
    this.query = this._apollo
      .watchQuery<HeroList>({
      	# Always make a network request, but use the cache as well
      	fetchPolicy: 'cache-and-network',
  	    query: HeroListQuery,
        variables: { type: HeroType.Speedster }
	    });
    
    # Pull changes from the store and display
    this.heroes$ = this.query.valueChanges
    	.pipe(
      	takeUntil(this._ngOnDestroy),
      	map((result) => result && result.data.heroes));
  }
}
```

```html
<!-- hero-list.component.html -->
<header class="plHeroList-header">
  Speedster Heroes
</header>
<section class="plHeroList-heroes">
  <section class="plHeroList-hero" *ngFor="let hero of heroes$ | async">
    {{ hero.name }} - {{ hero.secretIdentity }}
  </section>
</section>
```

```typescript
# hero-list.component.graphql.ts

export const HeroListHero = gql`
	fragment HeroListHero on Hero {
		id
		name
		secretIdentity
	}
`;

export const HeroListQuery = gql`
  query HeroList($type: HeroType) {
		heroes(type: $type) {
      heroes {
        ...HeroListHero
      }
		}
  }
	${HeroListHero}
`;

```

##### This looks cool, but what's actually going on here?

This component's main function is to list some heroes with the `Speedster` type and display their names and secret identities. It will first create a `QueryRef`, which Apollo uses to track queries in the application. The heroes themselves come from the query result. Since it's using `watchQuery`, and subsequent queries that request the same records with new info will automatically propagate that new info to this component.

The `hero-list.graphql.ts` file holds the actual query we are using. 
The `HeroListHero` const at the top is a `fragment`, which is basically a reusable part of a query. It also allows us to have more manageable TypeScript `interface` names (deeply nested queries could end up with interfaces named like `HeroList_heroes_father_brother_uncle_formerRoommate`).
The `HeroListQuery` is the actual query that we are using in the component. Here we define that we are requesting `heroes`, and that we want the hero to use the `fragment` from earlier for the hero fields. We then interpolate the `fragment` in this string so that the backend knows what it looks like.

#### What is NGRX?

NGRX borrows heavily from the Redux pattern that is commonly used on React. It requires that there is a *single source of truth* in your application, called the `Store`. You can then slice out (or `select`) the parts you need in your components.

Data on the store should **never** be manipulated directly, as that causes your components to become out of sync with eachother. Instead, you use `Action`s, which define the logic in which your data should be updated.

Dispatched actions are run through a function called a `Reducer`. Reducers are responsible for taking an action and updating the store based on the type of the action and the payload included.

All actions are processed synchronously, so what do you do if an action needs to trigger an API request? NGRX also has the concept of `Effects`. These are run asynchronously, which allows you to perform async commands as a *side effect* of the actions you dispatch.

Much of our code in the Home application uses this pattern heavily for both application state (settings, filters, etc) and data storage (data fetched from the backend). As we (re-)implement more features with GraphQL and Apollo, NGRX will only be used in the future to store application state, with data storage relegated to Apollo.

##### State Interface

Our app has 2 state interfaces:

- `IAppState` that defines the state for our *entire* application

  ```typescript
  // src/app/store/app.state.ts

  import { ITaskState } from '../task/store/task.state';

  export interface IAppState {
    tasks?: ITaskState;
  }
  ```

- `ITaskState` that defines the state for the task feature

  ```typescript
  // src/app/task/store/task.state.ts

  import { ApiRequestStatus, IApiRequestState } from '../../api/api.request';
  import { ITask } from '../task';

  export const TASK_STATE_NAME = 'tasks';

  export interface ITaskState {
    tasks: Map<number, ITask>;
    taskListLoadingStatus: IApiRequestState;
    taskRequestStatuses: Map<number, IApiRequestState>;
  }
  ```

The task state contains 3 fields:

- `tasks`: Our tasks mapped to their IDs
- `taskListLoadingStatus`: An object to keep track of the loading status of our list of tasks
- `taskRequestStatuses`: Similar to the above, but for saving/deleting specific tasks mapped to their IDs

##### Actions

Actions are how we define the behaviour of our application. If you open `task.actions.ts`, you can find we already have some defined actions for our app:

```typescript
// src/app/task/store/task.actions.ts

import { Action } from '@ngrx/store';
import { IApiError } from '../../api/api.error';
import { ITask } from '../task';

export enum TaskActions {
  RequestList = '[TASK] Request List',
  RequestListSuccess = '[TASK] Request List Success',
  RequestListFailure = '[TASK] Request List Failure'
}

export class TaskRequestListAction implements Action {
  readonly type: typeof TaskActions.RequestList = TaskActions.RequestList;
}

export class TaskRequestListSuccessAction implements Action {
  readonly type: typeof TaskActions.RequestListSuccess = TaskActions.RequestListSuccess;

  constructor(public tasks: ITask[]) { }
}

export class TaskRequestListFailureAction implements Action {
  readonly type: typeof TaskActions.RequestListFailure = TaskActions.RequestListFailure;

  constructor(public errors: IApiError) { }
}

export type TaskAction
  = TaskRequestListAction
  | TaskRequestListSuccessAction
  | TaskRequestListFailureAction;
```

Action files contain 3 things:

- An `enum` that defines the task names
  - This removes the need to have 'magic' strings in our codebase
- `class`es for each of our actions
  - These define the payloads for each of our types
  - In the current Platterz codebase, you will see we also use an `interface` plus a function to create an object with that interface. We are currently moving away from this pattern in favour of the one above.
- A union `type` of all our actions
  - This allows us to have type safety for generic task actions

##### Reducer

We currently have one `taskReducer` in our application. It is responsible for receiving `TaskAction`s and updating the `tasks` state accordingly.

Open `task.reducer.ts` to see what we have:

```typescript
// src/app/task/store/task.reducer.ts

import { cloneDeep } from 'lodash';

import { ApiRequestStatus } from '../../api/api.request';

import { TaskAction, TaskActions } from './task.actions';
import { ITaskState } from './task.state';

const DEFAULT_STATE: ITaskState = {
  taskListLoadingStatus: { status: ApiRequestStatus.Undefined },
  taskSaveStatuses: new Map(),
  tasks: new Map()
};

export function taskReducer(state: ITaskState = DEFAULT_STATE, action: TaskAction): ITaskState {
  switch (action.type) {
    case TaskActions.RequestList:
      return {
        ...state,
        taskListLoadingStatus: { status: ApiRequestStatus.Pending }
      };

    case TaskActions.RequestListSuccess:
      const newTasks = cloneDeep(new Map(state.tasks));
      action.tasks.forEach((task) => newTasks.set(task.id, task));

      return {
        ...state,
        taskListLoadingStatus: { status: ApiRequestStatus.Success },
        tasks: newTasks
      };

    case TaskActions.RequestListFailure:
      return {
        ...state,
        taskListLoadingStatus: {
          errors: action.errors,
          status: ApiRequestStatus.Failure
        }
      };

    default:
      return state;
  }
}

```

Reducers are pretty simple: a switch statement on the `type` of the action, we perform the change associated with it, and then return a new `state` object.

##### Effects

As we mentioned before, all actions are dispatched and reduced synchronously. `Effect`s allow us to perform asynchronous tasks as the result of an action.

Let's take a look at our `Effect`s in `task.effects.ts`:

```typescript
// src/app/task/store/task.effects.ts

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { TaskService } from '../task.service';

import {
  TaskAction,
  TaskActions,
  TaskRequestListAction,
  TaskRequestListFailureAction,
  TaskRequestListSuccessAction
} from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(
    private _taskService: TaskService,
    private _actions: Actions
  ) { }

  @Effect()
  requestTaskListEffect(): Observable<TaskAction> {
    return this._actions
      .ofType<TaskRequestListAction>(TaskActions.RequestList)
      .switchMap((action) => {
        return this._taskService.list()
          .map((taskList) => taskList.tasks)
          .map((tasks) => new TaskRequestListSuccessAction(tasks))
          .catch((errors) => [new TaskRequestListFailureAction(errors)]);
      });
  }
}
```

Again, this effect is pretty simple. It waits for a `TaskRequestListAction` to be dispatched, and then makes a list request for tasks. If it succeeds, it returns a success action, if it fails, the error is caught and a failure action is returned.

##### Selectors

So now we have our state, actions for that state, a reducer to manipulate the state, and async effects. So, how do we actually get the data out of the store? This is where selectors come in.

Open up `task.selectors.ts` for our current selectors:

```typescript
// src/app/task/store/task.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState, TASK_STATE_NAME } from './task.state';

export const selectTaskFeature = createFeatureSelector<ITaskState>(TASK_STATE_NAME);

export const selectAllTasks =
  createSelector(selectTaskFeature, (state) => Array.from(state.tasks.values()));

export const selectTasks = (ids: number[]) =>
  createSelector(selectTaskFeature, (state) => ids.map((id) => state.tasks.get(id)));

export const selectTask = (id: number) =>
  createSelector(selectTaskFeature, (state) => state.tasks.get(id));
```

The purpose of selectors is to *slice* our state into the pieces we need in our components. And they can be very powerful tools because they are *composable*, which means they can be combined and chained together to further filter.

For example, we have a feature selector at the top, which is used to slice out the `tasks` state from the `IAppState`. From there, we use that feature selector to access the tasks state, and select all tasks, a specific list of tasks, or a singular task.

So, now we have all the tools needed to use NGRX! So, how do we use this in practice?

#### Let's get started!

First, we want to update how we pull our list of tasks.

Currently, our `AppComponent` is responsible for requesting the list of tasks and pushing it down into the `TaskListComponent`. We want to change it so that `AppComponent` dispatches a `TaskRequestListAction`, and move the responsibility of getting the tasks from the store to `TaskListComponent`.

First, lets remove the `TaskService` dependency, since we only need the store. Then we can kill the `tasks` attribute, as this now comes from the store inside `TaskListComponent`. You can also comment out the other functions to avoid compiler errors.

```typescript
// src/app/app.component.ts
...
export class AppComponent implements OnInit {
  newTaskName: string;
  // tasks: ITask[];
  errors: IApiError;

  constructor(private _store: Store<IAppState>) { }
  ...
}
```

Now that there is no `TaskService`, we need to update how we fetch the list of tasks:

```typescript
// src/app/app.component.ts
...
ngOnInit(): void { // This
  this.newTaskName = '';
  this._store.dispatch(new TaskRequestListAction());

  // Delete the lines below
  // this.tasks = [];

  // this._taskService.list()
  //  .subscribe((taskList) => this.tasks = taskList.tasks);
}

//  Comment these out for now, keep them for helping you later
//  addTask(): void {
//    this._taskService
//      .save({ name: this.newTaskName })
//      .subscribe(
//        (task) => {
//          this.tasks.unshift(task);
//          this.newTaskName = '';
//        },
//        (errors) => this.errors = errors);
//  }
//
//  onTaskComplete(index: number): void {
//    const task = this.tasks[index];
//
//    this._taskService
//      .save({ ...task, completed: true })
//      .subscribe((newTask) => this.tasks[index] = newTask);
//  }
//
//  onTaskDelete(index: number): void {
//    const task = this.tasks[index];
//
//    this._taskService
//      .delete(task)
//    .subscribe((newTask) => this.tasks.splice(index, 1));
//  }
...
```

```Html
<section class="plApp">
  <form (ngSubmit)="addTask()">
    <section class="plApp-inputContainer">
      <input type="text" class="plApp-input" [(ngModel)]="newTaskName" placeholder="Add Task" name="task_name">
      <button type="submit" class="plApp-submitBtn">Save</button>
    </section>
  </form>
  <header class="plApp-header">My To-dos:</header>
  <!-- remove the [tasks]="tasks" from pl-task-list -->
  <pl-task-list (taskComplete)="onTaskComplete($event)" (taskDelete)="onTaskDelete($event)"></pl-task-list>
</section>

```

So, now our `AppComponent` initiates the task list via NGRX!

Our next step is to update `TaskListComponent` to pull the tasks from the store. First, we need to inject the store into the component's dependencies, then we need to select the tasks from the store to display them.

```typescript
// src/app/task/task-list/task-list.component.ts

// export class TaskListComponent {
export class TaskListComponent implements OnInit {
  // @Input() tasks: ITask[]; Remove this
  @Output() taskComplete: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskDelete: EventEmitter<number> = new EventEmitter<number>();

  tasks$: Observable<ITask[]>;

  constructor (private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.tasks$ = this._store.select(selectAllTasks);
  }
  ...
}
```

```html
<!-- src/app/task/task-list/task-list.component.html -->

<section class="plTaskList">
  <!-- notice the use of '| async' on the ngFor -->
  <section class="plTaskList-task" *ngFor="let task of tasks$ | async; let i = index">
    <button class="plTaskList-completeBtn" *ngIf="!task.completed" (click)="completeTask(i)">Complete</button>
    <span class="plTaskList-completedText" *ngIf="task.completed">COMPLETED</span>
    {{ task.name }}
    <button class="plTaskList-deleteBtn" (click)="deleteTask(i)">X</button>
  </section>
</section>

```

Since the NGRX Store is an observable, anything that we select from it is asynchronous. This has a couple of advantages over synchronous variables:

- We can turn off `ChangeDetection` to speed up our app (you can read more about that [here](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html))
- We get updates from the store as the store changes. For example, if a new task is added, the observable will emit a new value and our view will update accordingly.

In order to do this, we must use the `AsyncPipe`, seen above with the `ngFor`. The pipe automatically manages subscriptions to the observable, and gets the emitted value.

At this point, your application should build and request tasks!

But wait, now you can't add new tasks, or complete/delete existing ones. Plus, our existing app did not meet all the requirements.

The next steps will be:

###### Create an effect to load tasks when a user is logged in

- Remove the code to load tasks in `AppComponent`
- Add an effect in `TaskEffects` that reloads tasks on rehydrate or login success

###### Add a logout button

- Add a button to logout
- Create a logout effect that destroys the session in `AuthEffects`
- Update the reducer to handle the logout

###### Allow creation of new tasks

- Add new fields to the task state:
  - `newTaskName`
  - `newTaskSaveStatus`
- Add new actions to create tasks
- Update the reducer for these new actions

###### Allow users to mark tasks as complete

- Add new actions to mark tasks as complete/uncomplete
- Utilize the existing state
- Add an effect for these new actions
- Remove the `@Output` for updating tasks, plus the function for performing the update in `AppComponent`
  (Don't forget about the template!)

###### Allow users to delete tasks

- Add new actions to delete tasks
- Utilize the existing state
- Add an effect for the new actions
- Remove the `@Output()` and the corresponding `AppComponent` function

###### Allow Users to sort tasks by date created or alphabetically

This task is more open ended. You may tackle this however you see fit, but make sure to use the store as much as possible (vs local fields).

Here are some useful resources to get you started:

http://learnrxjs.io
https://v4.angular.io/docs
http://ngrx.github.io

Of course, feel free to bug one of the front end devs if you get stuck!

###### Authentication

Authentication is already includedauth

### Styling

At Platterz, we use a BEM-style of CSS.

BEM stands for **B**lock **E**lement **M**odifier and denotes a methodology through which CSS can be organized. 

For example, the task section has a class of `.plTaskList-task`
`plTaskList` is the component that we are currently in, and `-task` is the portion that we are styling.

This describes the `plTaskList` block and the `task` element within it. This can then have modifiers bound with `--` that can denote specific _types_ of that element. For example: `plTaskList-task--complete` & `plTaskList-task--incomplete`. 

Due to our usage of Angular you probably won't find much need to use modifiers in your code. You'll probably make use of `NgClass` and modify elements like this instead:
```html
<section class="plTaskList-task" [class.isComplete]="..." [class.isIncomplete]="...">
  ...
</section>
```

We also use component styling. Styles are written for specific components in their folder, and are scoped to their context.

For example, consider 2 components: `pl-parent` and `pl-child`, where `pl-child` is nested inside `pl-parent`. Styles written for the parent component will not apply to elements inside the child component.

The styles for this project are open-ended, so you can experiment with it and see what you can do. Don't be afraid to bug one of us for help here!

We also want you to make use of the variables in `assets/styles/variables`. Also try your hand with `mixins`.

Here are some ideas to get you started:

1. Add the task list to a container, similar to the auth page.
2. Add the complete/delete buttons to a dropdown or hideable menu
3. Separate your tasks in your lists visually. You could use a simple border between them, or make them separate boxes with some margin between
4. Make the task input nice and big, and add a placeholder and/or title

### Unit Tests

In addition to writing the functionality of your app, we also want you to test the different components and pieces of it.

All test files are present, you just need to fill in the tests.

For examples of how to test, you can refer to spec files inside the `auth` folder. You may also reference tests in our current codebase in `platterz/home` or `platterz/common`.

In order to run the tests, you need to install Jest globally:

```bash
$ yarn global add jest
```

You can run your tests with `yarn test:watch`, or `yarn test` for a single run.

You can use these resources to help you along:

https://docs.angularjs.org/guide/unit-testing
https://facebook.github.io/jest/docs/en/getting-started.html
https://github.com/ngrx/platform/blob/master/docs/store/testing.md

### End-to-End Tests

For our integration tests, we use a tool called [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html). Cypress allows us to quickly and efficiently build out integrations, that are completely separate from our main codebase.

There are 4 main parts to how we structure our tests:

- Integrations. These are what is actually run by Cypress.
- Flows. These are collections of commands that are packaged to be reusable. They will reduce the amount of code written in our integrations.
- Components. These are simple classes with many getters that represent elements on the page.
- Seeds. These are helpers to seed data to the API before you run your test. This will not be applicable here, as we won't have a backend for the feature.

You can take a look at the `cypress` folder at the root of the project for an example of a test.

Please note that this is a new structure for tests that is not in our main branch yet. Bug JT (or one of the other front-end devs) if you have any questions on this.

In order to start Cypress, run `yarn cypress` in your terminal inside the project.
