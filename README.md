# Storefront Backend Project

## Description
This is a simple API for an online store made with [Express](https://expressjs.com) and [PostgreSQL](https://www.postgresql.org) .

>Check out the REQUIREMENTS.md for the API docs.

## Dependencies

- [express](https://expressjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [nodemon](https://nodemon.io/)
- [jasmine](https://jasmine.github.io/)
- [pg](https://www.npmjs.com/package/pg)
- [db-migrate](https://www.npmjs.com/package/db-migrate)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cors](https://www.npmjs.com/package/cors)
- [supertest](https://www.npmjs.com/package/supertest)

## Scripts

-  `npm run build` : build the project for production
-  `npm run dev` : start the project in development mode
-  `npm run test` : run the tests
-  `npm run lint` : run the linter
-  `npm run start` : start the project in production mode
-  `npm run prettier` : run the prettier formatter

## Database

1. connect to the postgres database, with your user name replace `*` with your user name. ` psql -U **** `
2. create `storefront_dev` and `storefront_test` databases:
```
CREATE DATABASE storefront_dev; CREATE DATABASE storefront_test;
```
> Database will be running on port: 5432

## .env File
create a `.env` file in the root directory and replace `*` with your data.

```
ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=******
POSTGRES_PASSWORD=******
SALT_ROUNDS=10
SALT=speak-to-the-elder-one
TOKEN_SECRET=replace-this-if-you-want
TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJmaXJzdG5hbWUiOiJNb21lbiIsImxhc3RuYW1lIjoiU2FtZWgiLCJwYXNzd29yZCI6IiQyYiQxMCRJa0l3SC9icVU4dHlUM2JxUU9VQjFPWHU5STB5djZ4ZU1HdUxUNnRVNzhTdUplM0dCUFNVVyJ9LCJpYXQiOjE2NTk5NTQ2ODZ9.C55B6tskkqV8_mVbLlzDAyuEXXzeqnVwPeMWQ-aFTqU
```

## Run the server
1. Install dependencies `npm install`
2. Migrate the database `db-migrate up`
3. Start the server run `npm run dev` Server will run on `http://localhost:3000`