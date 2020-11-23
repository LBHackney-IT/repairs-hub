# Repairs Hub

Frontend facing application for the [repairs API](https://github.com/LBHackney-IT/repairs-api).

| Dependency | Version |
| ---------- | ------- |
| Ruby       | 2.7.2   |
| Rails      | 6.0.3   |
| Yarn       | 1.15.2  |

## Preflight

### Clone the project

```sh
$ git clone git@github.com:LBHackney-IT/repairs-hub.git
```

### First Time Setup

#### Install the project's dependencies using bundler:

```sh
$ bundle install
```

```sh
$ yarn install
```

### Data base setup

Postgres should be running

```sh
$ rails db:create
```

```sh
$ rails db:migrate
```

#### Environment variables:

Create your `.env` file from `.env.sample`. You must add the repairs API endpoint here. (example: ENDPOINT_API=http://localhost:3035)

#### Tests

We use Jest for our unit testing library. You can run the full javascript test suite using following command:

```sh
$ yarn test
```

#### Start the server:

We have added a `Procfile` and with the help of foreman you are able to run the rails server and webpack dev server both at once

```sh
$ foreman start
```

## Github Actions

We use Github Actions as part of our continuous integration process to build, run and test the application.
