 ## RIDE-MY-WAY

[![Build Status](https://travis-ci.org/DinmaOtutu/RIDE-MY-WAY.svg?branch=develop)](https://travis-ci.org/DinmaOtutu/RIDE-MY-WAY) 
[![Coverage Status](https://coveralls.io/repos/github/DinmaOtutu/RIDE-MY-WAY/badge.svg?branch=develop)](https://coveralls.io/github/DinmaOtutu/RIDE-MY-WAY?branch=develop) 


This is an application that allows user to request for a ride, and the driver accepts or rejects the request.

## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [API Endpoints](#api-endpoints)
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    * [Development](#development)
    


### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker.
You can find the template at [https://www.pivotaltracker.com/n/projects/2177910](https://www.pivotaltracker.com/n/projects/2177910)

### Template
Template is hosted at [https://dinmaotutu.github.io/RIDE-MY-WAY/](https://dinmaotutu.github.io/RIDE-MY-WAY/)

### API Deployment
API is deployed at [https://ride-my-way-cars.herokuapp.com](https://ride-my-way-cars.herokuapp.com)

### Documentation
Documentation is hosted at [https://ride-my-way-cars.herokuapp.com/api/v1/docs](https://ride-my-way-cars.herokuapp.com/api/v1/docs)
    
 
## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework
* [npm](https://www.npm.com/) - Dependency Manager

### Supporting Packages

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://babel.io/) - Compiler for Next Generation JavaScript

## Test Tools
* Mocha - JavaScript Test Framework for API Tests
* Chai - TDD/BDD Assertion Library for Node


## Features
 
### Users
* sign up and login
* request for a ride
* view rides for the day
* decline or continue with request
* Make a ride offer
* Accept a ride request
* Reject a ride request
* get notifications
* view ride history
     
## Getting Started

### Installation

* git clone
  [RIDE-MY-WAY](https://github.com/DinmaOtutu/RIDE-MY-WAY.git)
* Run npm install` to install packages
* Run npm run build to build the project
* Run npm start to start the server
* Navigate to [localhost:8000](http://localhost:8000/) in browser to access the
  application

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:8000](http://localhost:8000/) in
  [Postman](https://getpostman.com/) to access the application

#### Testing with Coverage Data

* After installing as shown 

* Run npm test
* It will lint code, run test and display coverage data as generated by
  [nyc](https://github.com/nyc)

### Development
You can run npm run start:serve` in development to use [Nodemon](https://nodemon.io/)

[Nodemon](https://nodemon.io/) restarts your code after a file change or type 'rs' to restart. 
 