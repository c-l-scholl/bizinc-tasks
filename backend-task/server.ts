import express, { NextFunction, Request, Response } from "express";
import path from "path";
import users from "./routes/users"; 
import dotenv from "dotenv";

// Recommended by Mason Hu on Medium
// Link: https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188
import "express-async-errors";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for postman

// Routing
app.use("/api/users", users);

// Logging Middleware
// app.use(logger);

// Catchall Not Found
app.use(notFound);

// Error Handling Middleware
app.use(errorHandler);



app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
