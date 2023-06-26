# Project Setup

## Installation

```
cd existing_repo
npm install
cd frontend
npm install
```

## Run the fronted

```
cd existing_repo/frontend
ng serve
```

## Run the unit-tests

```
cd existing_repo/frontend
ng test
```

## Run the Linter

```
cd existing_repo
npx eslint .
```

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

# Setting Up a SQL Database with XAMPP and phpMyAdmin

Welcome to the wiki entry that guides you through the step-by-step process of setting up an SQL dump and a database using XAMPP and phpMyAdmin. This process allows you to import an existing database structure and data into your local development environment to work with.

In this tutorial, we'll focus on using XAMPP, a popular cross-platform web development environment that includes an integrated MySQL database and the powerful database management tool, phpMyAdmin.

## Setup Steps

**Install XAMPP:** Download and install XAMPP on your computer. You can obtain the latest version from the official XAMPP website: XAMPP Website.

**Create a Database:** Open XAMPP and start the Apache and MySQL services. Then, access phpMyAdmin by visiting [phpmyadmin](http://localhost/phpmyadmin) in your web browser. Create a new database where you want to import the SQL dump.

**Import SQL Dump:** In phpMyAdmin, select the database you created earlier. Navigate to the "Import" tab and choose the SQL dump file you want to import. Review the settings and click "OK" to start the import process.

**Verify Imported Data:** After the import completes, you can verify the imported data in phpMyAdmin by inspecting the tables and records within the database.

**Connect to the Database with node.js & Express:** To establish a connection to your database in this application, use the appropriate connection information (host, username, password, database name) in your PHP code. Here's an example:

**DB-Reference**

```
const database: Connection = mysql.createConnection(Configuration.mysqlOptions);

database.connect((err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});
```

## Prerequisites

Before you begin, make sure you have XAMPP installed on your computer. If you haven't installed XAMPP yet, please refer to the official XAMPP website [apachefiends](https://www.apachefriends.org/) for instructions on how to download and install it.

## Next Steps

To proceed with the setup process, please follow the detailed instructions provided in the corresponding sections above.

We hope this guide helps you in setting up your SQL database using XAMPP and phpMyAdmin. If you encounter any difficulties or have any questions, feel free to consult the official documentation or seek support from the XAMPP and phpMyAdmin communities.
Enjoy working with your SQL database and building amazing applications with XAMPP and phpMyAdmin!

# Introduction to Express Server with Database Integration

Introduction to an Express server that is available for you to connect to a database. This server can be started using the command "run" or "npm run" and runs alongside a pre-built application on [Localhost:8080](http://localhost:8080).

## Overview

The Express server provided in this project offers a robust and flexible framework for building web applications and APIs. With its seamless integration with various databases, you can easily establish a connection to your preferred database system and perform operations such as retrieving, updating, and deleting data.

## Prerequisites

Before you begin, make sure you run build of this application with the command `ng build` on your computer.

## Getting Started

To get started with the Express server and its database integration, follow these steps:

**Installation:** Ensure that you have Node.js and npm (Node Package Manager) installed on your machine. Then, navigate to the project directory and run npm install to install the necessary dependencies.

**Database Configuration:** Before connecting to a database, make sure you have the required credentials and connection details. Update the server's configuration file (config.js or config.ts) with the appropriate information, including the host, port, username, password, and database name.

**Starting the Server:** Open a terminal or command prompt, navigate to the project directory, and run the command `npm run` to start the Express server. The server will listen on [Localhost:8080](http://localhost:8080).by default, but you can modify the port in the server configuration if needed.

**Database Connection:** Once the server is up and running, you can establish a connection to your database within your Express application. Utilize the appropriate database driver or ORM (Object-Relational Mapping) library, such as Sequelize or Mongoose, to establish the connection and perform database operations.
`npm run`

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

## Architecture

**UML - ERD, ClassUMl, Server & Services-Architecture** -> [Lucidchart](https://lucid.app/lucidchart/f3abf4db-1bb2-45b4-a8df-b1fcc11f472c/edit?view_items=Po39rz5h2ZiB%2Cns394boYXZFI%2CDt39M_oLnSBv&invitationId=inv_48637dad-3c87-40c7-a778-5174e1a87c8c).
**Wireframe&Mock-Up** -> [Canva](https://www.canva.com/design/DAFlnrUtzzc/5e7_EnRVtcPCBq-QDILKHQ/edit?utm_content=DAFlnrUtzzc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
