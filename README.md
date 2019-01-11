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

The `gql` token is used to tag strings as GraphQL

##### Updating the Schema and TS Definitions

We've added some handy commands: `npm run gql:schema` and `npm run gql:codegen`. `schema` will download a new `schema.json` file from the API, and `codegen` will create the new TypeScript files for your interfaces.

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
  
  import { IAuthState } from '../auth/store/auth.state';
  import { ITaskState } from '../task/store/task.state';
  
  export interface IAppState {
    tasks?: ITaskState;
    auth?: IAuthState;
  }
  
  ```

- `ITaskState` that defines the state for the task feature

  ```typescript
  // src/app/task/store/task.state.ts
  
  export enum TaskSortOrder {
    Ascending = 'ascending',
    Descending = 'descending'
  }
  
  export enum TaskSortType {
    Date = 'date',
    Alpha = 'alphabetical'
  }
  
  export const TASK_STATE_NAME = 'tasks';
  
  export interface ITaskState {
    sortType: TaskSortType;
    sortOrder: TaskSortOrder;
  }
  ```

The main purpose of the task state is to hold filtering and sorting settings (part of our _application_ data).

##### Actions

Actions are how we define the behaviour of our application. If you open `task.actions.ts`, you can find we already have some defined actions for our app:

```typescript
// src/app/task/store/task.actions.ts

import { Action } from '@ngrx/store';
import { TaskSortOrder, TaskSortType } from './task.state';

export enum TaskActions {
  UpdateSortType = '[TASK] Update Sort Type',
  UpdateSortOrder = '[TASK] Update Sort Order'
}

export class TaskUpdateSortTypeAction implements Action {
  readonly type: typeof TaskActions.UpdateSortType = TaskActions.UpdateSortType;

  constructor(readonly sortType: TaskSortType) { }
}

export class TaskUpdateSortOrderAction implements Action {
  readonly type: typeof TaskActions.UpdateSortOrder = TaskActions.UpdateSortOrder;

  constructor(readonly sortOrder: TaskSortOrder) { }
}

export type TaskAction = TaskUpdateSortTypeAction | TaskUpdateSortOrderAction;

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

import { TaskAction, TaskActions } from './task.actions';
import { ITaskState, TaskSortOrder, TaskSortType } from './task.state';

const DEFAULT_STATE: ITaskState = {
  sortType: TaskSortType.Date,
  sortOrder: TaskSortOrder.Descending
};

export function taskReducer(state: ITaskState = DEFAULT_STATE, action: TaskAction): ITaskState {
  switch (action.type) {
    case TaskActions.UpdateSortOrder:
      return { ...state, sortOrder: action.sortOrder };

    case TaskActions.UpdateSortType:
      return { ...state, sortType: action.sortType };

    default:
      return state;
  }
}

```

Reducers are pretty simple: a switch statement on the `type` of the action, we perform the change associated with it, and then return a new `state` object.

##### Effects

As we mentioned before, all actions are dispatched and reduced synchronously. `Effect`s allow us to perform asynchronous tasks as the result of an action.

Let's take a look at our `Effect`s in `auth.effects.ts`:

```typescript
// src/app/task/store/task.effects.ts

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthRehydrateAction, AuthRehydrateSuccessAction } from './auth.actions';
import {
  AuthAction,
  AuthActions,
  AuthLoginAction,
  AuthLoginFailureAction,
  AuthLoginSuccessAction
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions: Actions,
    private _authService: AuthService
  ) { }

  @Effect()
  loginEffect(): Observable<AuthAction> {
    return this._actions
      .ofType<AuthLoginAction>(AuthActions.Login)
      .pipe(switchMap((action) => {
        return this._authService
          .login(action.email, action.password)
          .pipe(
            tap((session) => localStorage.setItem('authToken', session.token)),
            map((session) => new AuthLoginSuccessAction(session)),
            catchError((errors) => [new AuthLoginFailureAction(errors)]));
      }));
  }

  @Effect()
  rehydrateEffect(): Observable<AuthAction> {
    return this._actions
      .ofType<AuthRehydrateAction>(AuthActions.Rehydrate)
      .pipe(switchMap((action) => {
        return this._authService
          .currentSession()
          .pipe(
            tap((session) => localStorage.setItem('authToken', session.token)),
            map((session) => new AuthRehydrateSuccessAction(session)),
            catchError(() => [new AuthRehydrateSuccessAction(null)]));
      }));
  }
}

```

Each of these functions will wait for actions of a certain type to be dispatched. Once they are, they will perform and action and in turn dispatched their own actions. 

##### Selectors

So now we have our state, actions for that state, a reducer to manipulate the state, and async effects. So, how do we actually get the data out of the store? This is where selectors come in.

Open up `task.selectors.ts` for our current selectors:

```typescript
// src/app/task/store/task.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState, TASK_STATE_NAME } from './task.state';

export const selectTaskFeature = createFeatureSelector<ITaskState>(TASK_STATE_NAME);

export const selectSortType =
  createSelector(selectTaskFeature, (state) => state.sortType);

export const selectSortOrder =
  createSelector(selectTaskFeature, (state) => state.sortOrder);

```

The purpose of selectors is to *slice* our state into the pieces we need in our components. And they can be very powerful tools because they are *composable*, which means they can be combined and chained together to further filter.

For example, we have a feature selector at the top, which is used to slice out the `tasks` state from the `IAppState`. From there, we use that feature selector to access the tasks state, and select the sort type and order for tasks.

So, now we have all the tools needed to use NGRX and Apollo! So, how do we use this in practice?

#### Let's get started!

We have created a series of placeholder components:

`AppComponent`: The root application component
`AuthComponent`: Used to log in
`RXComponent`: A base component that most other components extend for Reactive programming helpers
`TaskComponent`: Will be used to display a singular todo task

`CreateTaskComponent`: Used to create tasks with tags
`TaskListComponent`: Will be used to display a single task list
`TaskListsComponent`: The parent component for the `/task-lists` route
`AllTaskListsComponent`: A small UI component to show a list of all component and the link to create a component
`CreateTaskListComponent`: Will be used to create a component
`NoTaskListsComponent`:  Placeholder component when you are not on the create or view list route

You also have some predefined routes:

`/auth`: Routes to `AuthComponent`
`/task-lists`: Routes to `NoTaskListsComponent`
`/task-lists/create`: Routes to `CreateTaskComponent`
`/task-lists/:id`: Routes to `TaskListComponent` with a particular `id`

All the components above have more detailed instructions on what you need to do to complete the task.

#### Styling

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

#### Unit Tests

In addition to writing the functionality of your app, we also want you to test the different components and pieces of it.

All test files are present, you just need to fill in the tests.

For examples of how to test, you can refer to spec files inside the `auth` folder. You may also reference tests in our current codebase in `platterz/home` or `platterz/common`.

In order to run the tests, you need to install Jest globally:

```bash
$ npm install -g jest
```

You can run your tests with `npm run test:watch`, or `npm run test` for a single run.

You can use these resources to help you along:

https://docs.angularjs.org/guide/unit-testing
https://facebook.github.io/jest/docs/en/getting-started.html
https://github.com/ngrx/platform/blob/master/docs/store/testing.md

#### End-to-End Tests

For our integration tests, we use a tool called [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html). Cypress allows us to quickly and efficiently build out integrations, that are completely separate from our main codebase.

There are 4 main parts to how we structure our tests:

- Integrations. These are what is actually run by Cypress.
- Flows. These are collections of commands that are packaged to be reusable. They will reduce the amount of code written in our integrations.
- Components. These are simple classes with many getters that represent elements on the page.
- Seeds. These are helpers to seed data to the API before you run your test. This will not be applicable here, as we won't have a backend for the feature.

You can take a look at the `cypress` folder at the root of the project for an example of a test.

Please note that this is a new structure for tests that is not in our main branch yet. Bug JT (or one of the other front-end devs) if you have any questions on this.

In order to start Cypress, run `npm run cypress` in your terminal inside the project.
