# SENG513Project

This project is built with Vue.js for the frontend and Java Spring for the backend, aiming to deliver a full-stack application with a robust backend API and a dynamic frontend user interface.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Frontend](#running-the-frontend)
- [Running the Backend](#running-the-backend)
- [Contributing](#contributing)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed and running:

- [Node.js and npm](https://nodejs.org/en/): You will need Node.js and npm to run the Vue.js frontend. Installing Node.js will also install npm.
- [Java JDK 17](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html): Required to compile and run the Spring backend. Only needed to run frontend and backend on your local machine (so if you're doing the frontend I think you don't need it?)
- [Maven](https://maven.apache.org/): Necessary for dependency management and running the Spring backend. Only needed to run frontend and backend on your local machine (so if you're doing the frontend I think you don't need it?)

### Installation

To set up the project for development, you'll need to clone the repository and install dependencies for both the frontend and backend.

1. Clone the repository:
   git clone https://github.com/HAPPYSACKS/SENG513Project.git

## Running the frontend

1. `cd frontend` to goto the right folder.
2. `npm install` to install the frontend's packages.
3. `npm run serve` to run the frontend.

## Running the Backend

1. cd backend/backend
2. mvn spring-boot:run

## Running both frontend and backend

You will need all the [Prerequisites](#prerequisites) described above.

1. `npm start`
