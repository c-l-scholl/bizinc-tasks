# Backend Task

First, run 

```bash
npm install
```

To properly connect the database, create a .env file in the /backend-task directory. Enter the values:

PORT="Server port" <br>

PG_USER="Postgres username" <br>
PG_HOST="Host" <br>
PG_DATABASE="Database name" <br>
PG_PASSWORD="Postgres password" <br>
PG_PORT="Database port" <br>

To launch the server, run

```bash
npm run dev
```

> [!NOTE]
> If you are using JavaScript, then you should edit package.json to be the following

```
{
//...
"scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
//...
}
```

To interact with the backend, use Postman on http://localhost:8080/api/users/

## Explanation

### Node.js Server

The src/server.ts contains my Express.js setup, with error handling, logging, routing, etc. The routing is handled in routes/users.ts, with full CRUD functionality. For error handling, I followed a tutorial on Medium (linked in middleware/errorHandler.ts), since the Express.js Error doesn't quite match the included NodeJS Error. 

### Middleware

For my middleware, I have a logger, two body parsers, a custom error handler,  and a catch-all not found. 

The logger is very simple, printing out basic information to the terminal. I added the colors package to make the information more readable. 

The body parsers handle both JSON payloads and urlenconded payloads, the latter of which I used quite often through Postman.

The error handler lets me customize the status code and message of the error, or give a default error code and message. The catch-all is an extension of the error handler called earlier in the middleware process to catch routes that do not exist.

### PostgreSQL

I created a single table called users in a PostgreSQL database, and implemented CRUD operations in the routing file (routes/users.ts) to interact with the database. I included all necessary information that would be required to make an account on a website (user_id, email, and password) and included first name and last name since they were easier to test at first. Each call to the database is initiated through a Postman action, as the database is called through the router functions. 



