# SENG513Project

This project is built with Vue.js for the frontend and Java Spring for the backend, aiming to deliver a full-stack application with a robust backend API and a dynamic frontend user interface.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Getting Started For Developers](#getting-started-for-developers)
  - [Prerequisites for Devs](#prerequisites-for-devs)
  - [Installation](#installation)
- [Running the Frontend](#running-the-frontend)
- [Running the Backend](#running-the-backend)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Docker](https://www.docker.com): You will need docker.

1. Clone the repository: `git clone https://github.com/HAPPYSACKS/SENG513Project.git`
2. Goto the root directory of the project (at the `SENG513Project` directory)
3. `docker build -t study_buddy -f frontend/Dockerfile .`
4. `docker run -p [SOME_PORT_NUMBER]:8080 study_buddy`

## Getting Started For Developers

### Prerequisites for Devs

Before you begin, ensure you have the following tools installed and running:

- [Node.js and npm](https://nodejs.org/en/): You will need Node.js and npm to run the Vue.js frontend. Installing Node.js will also install npm.

### Installation

To set up the project for development, you'll need to clone the repository and install dependencies for both the frontend and backend.

1. Clone the repository:
   git clone https://github.com/HAPPYSACKS/SENG513Project.git

## Running the frontend

1. `cd frontend` to goto the right folder.
2. `npm install` to install the frontend's packages.
3. `cd ..` to run the go back to the root directory.
4. `npm run start:frontend`

## Running the Backend

1. `npm install`
2. `npm run start:backend`

## Running both frontend and backend

1. `npm start`
