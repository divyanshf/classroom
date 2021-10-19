# Classroom (Web)

## Description
A web application for teacher and students to engage virtually.

## Features
- User Authentication and Authorization.
- Teacher
  - Create Classes
  - Create Assignments
- Student
  - Join Classes
  - Submit Assignments
- Create announcements.

## Technologies / Libraries Used
- [ReactJS](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)

## Build From Source

### Prerequisite
- Node
- NPM
- Mongo

### Setup
- Clone this repository.
- Start your mongo server
- In the repository's root directory, create a .env file that contains the following keys.
  <ol>
    <li>JWT_SECRET</li>
    <li>MONGO_URI</li>
  </ol>
- In the client directory, build the React application.
  ```
  npm build
  ```
- In the root directory of this repository, run the Node application.
  ```
  npm start
  ```
- Go to [localhost:8080](http://localhost:8080/).

*NOTE* : For a detailed description of the API endpoints for this project, have a look at the [README_API.md](https://github.com/DivyanshFalodiya/classroom/blob/master/README_API.md) file.

## Hosting
You can view the live project [here](https://fliprclassroom.herokuapp.com/)
 
