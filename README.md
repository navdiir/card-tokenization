
## Description

Repository to simulate the card tokenization process.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Environments vairables

```bash
# define a specific port (default: 3000)
$ PORT=

# define a specific host (default: '0.0.0.0')
$ HOST=

# database user to connect to mongodb
$ DATABASE_USER=

# database password to connect to mongodb
$ DATABASE_PASSWORD=

# database host to connect to mongodb
$ DATABASE_HOST=

# database name to connect to mongodb
$ DATABASE_NAME=

# jwt secret to encrypt cards (default: 'hard-secret')
$ JWT_SECRET=

# jwt expiration time (default: 60s)
$ JWT_EXPIRED_TIME=
```