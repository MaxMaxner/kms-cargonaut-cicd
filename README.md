# How to develop

To make it easy for you to get started, here's a list of recommended steps for working on this project.

## Git workflow
To ensure that all developers involved have the smoothest possible workflow, <br>
we decided to we have decided to split the project into several branches. <br>

**master** will only be pushed to at the end of project and will contain the ready to use application <br>
**develop** is the "working" branch where all the features get implement one after another <br>
**feature-branch** used from the developers to work on their current task


To create a new feature branch proceed as follows:

```
cd existing_repo
git checkout develop
git pull develop
git checkout -b <feature-branch-name>
```

To update a feature branch, to get the newest version of develop, proceed as follows:

```
cd existing_repo
git checkout develop
git pull develop
git checkout <feature-branch-name>
git merge develop (solve merge conflicte if necessary)
```

After a feature is implemented, tested and ready to get merged into develop, proceed as follows:

```
cd existing_repo
git checkout develop
git pull develop
git checkout <feature-branch-name>
git merge develop (solve merge conflicte if necessary)
git add . (add all of your changes and the resolved merge conflict -- if any occured)
git push origin <feature-branch-name>
open an MR (merge request)
```

# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
