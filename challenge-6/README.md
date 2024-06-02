
# CAR MANAGEMENT API


## How to use

- Clone this repository
- Make .env in base dir
.env file should contains
```bash
    DB_USERNAME
    DB_HOST
    DB_PASSWORD
    DB_NAME
    DB_PORT
    DB_DIALECT

    ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET
    BASE_URL
```
## Installation

- Install module
```bash
    npm install
```
- To create DB
```bash
    npx sequelize db:create
```
- To run migration
```bash
    npx sequelize db:migrate
```
- To insert data from seeders
```bash
    npx sequelize db:seed:all
```

## API Reference

#### API Documentation Page

```http
  GET /api/docs
```

