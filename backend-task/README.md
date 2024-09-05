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