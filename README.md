# Mission Defense Team Training Tracker Server

## Overview:
This project contains an Express API Server that is intended to serve as a backend for a MDT Training Tracker application. When connected to a PostgreSQL database and a front end, this application has the necessary end points to create, read, update, and delete data entries regarding the many aspects that go into managing and tracking the training status of operators in a MDT.

## Table of Contents:
1. [Overview](#overview)
2. [Details](#details)
3. [Installation](#installation)
4. [Usage](#usage)

## Details:
This server is designed to manage several parts of the training tracking pipeline for a group of operators, to include:
1. Individual Users
2. Groups of Users on Crews
3. Training Assignments
4. Groups of Training Assignments/Modules
5. Logging the Training Revision/Review Process

Through the different API endpoints, these different sets of information are tracked, as well as their relationships to each other. To go into more detail, the previous entities track the following data:

### Users:
- Name
- Rank
- Username
- Assigned Crew
- Supervisor Status
- Training Management Status
- Training Approver Status

### Training Tasks:
- Task Title
- Task Description
- Directions to access content/register for course/get placed on waitlist


### Training Modules:
- Module Title
- Operator Level module is intended for
- Approval Status of module

### Training Revision:
- Tracks named sets of revisions
- Includes sufficient fields for in-depth descriptions and justifications for training alterations
- Tracks approval status from unit approver

Together these different entities and their relations allow units to track training for their operators all in one place with a streamlined and easy to use system.


## Installation:
**Note:** This project depends on having Node.JS and NPM on your workstation, as well as access to a PostgreSQL database.
1. Download this project to your workstation using your method of choice.
2. Navigate to the location of the project and run `npm install` to download install the project's software dependencies.
3. Open the `knexfile.js` with your preferred editor and fill in the appropriate fields with your PostgreSQL access information.
4. Run the command `npm run` to start the Express API. The server will log to the console the port it is running on, and you may make all API calls to your workstation's address, through that port.

## Usage:

### Users:
User records can be accessed through the `/users/` endpoint with the following options:
- `/users/`
    - GET to receive all users
    - POST to add a new user
- `/users/<id>/` - Address user record by user id
    - GET, PUT, PATCH, & DELETE functionality
- `/users/<id>/modules/` - Access modules assigned to user
    - GET to receieve all assigned modules
    - POST to append a new assigned module
- `/users/<id>/modules/<module_id>` - Access a specific module assigned to a user
    - PUT, PATCH to update the assigned module
    - DELETE to unassign the module
- `/users/account/<username>/` - Address user record by username
    - GET to recieve user information
- `/users/account/<username>/overview/` - Returns all information relevant to the user
    - GET to receieve user overview

### Crews:
Crew records can be accessed through the `/crews/` endpoint.
- `/crews/` - Access information regarding all crews
    - GET to recieve all crews
    - POST to add a new crew to database
- `/crews/<id>/` - Access information regarding a specific crew
    - GET, PUT, PATCH, DELETE functionality

### Modules:
Module records can be accessed through the `/modules/` endpoint.
- `/modules/` - Access information regarding all modules
    - GET to recieve all modules
    - POST to add new modules
- `/modules/<id>/` - Access information regarding a specific module
    - GET, PUT, PATCH, DELETE functionality

### Tasks:
Task records can be accessed through the `/tasks/` endpoint.
- `/tasks/` - Access information regarding all tasks
    - GET to receive all modules
    - POST to add new tasks
- `/tasks/<id>/` - Access information regarding specific tasks
    - GET, PUT, PATCH, DELETE functionality

### Training Modifications
Training revisions can be accessed through the `/requests/` endpoint.
- `/requests/` - Access information regarding all requests
    - GET to receieve all stored requests
    - POST to open a new request
- `/requests/<id>/` - Access information regarding a specific request
    - GET, PUT, PATCH, DELETE functionality