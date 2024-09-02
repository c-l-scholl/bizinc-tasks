import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import BadRequestError from "../middleware/errorTypes/BadRequestError";
import { query } from "../src/db";

const router = express.Router();

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

// let users: User[] = [
// 	{
// 		id: "1",
// 		firstName: "Camden",
// 		lastName: "Scholl",
// 		email: "camden@scholl.com",
// 	},
// 	{
// 		id: "2",
// 		firstName: "Jay",
// 		lastName: "Bob",
// 		email: "jay@bob.com",
// 	},
// 	{
// 		id: "3",
// 		firstName: "Jill",
// 		lastName: "Blue",
// 		email: "jill@blue.com",
// 	},
// ];

// Get all users
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await query("SELECT * FROM users");
		const users: User[] = result.rows;

		if (req.query.limit && typeof req.query.limit == "string") {
			const queryLimit: number = parseInt(req.query.limit);

			if (!isNaN(queryLimit) && queryLimit > 0) {
				return res.status(200).json(users.slice(0, queryLimit));
			}
		}
		res.status(200).json(users);
	} catch (err) {
		console.error("Error querying data:", err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get single user
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid: string = req.params.id;
		const result = await query("SELECT * FROM users WHERE user_id = $1", [uid]);
		const foundUser: User = result.rows[0];

		if (!foundUser) {
			throw new BadRequestError({
				code: 404,
				message: `A user with the id of ${uid} was not found`,
				logging: false,
			});
		}
		res.status(200).json(foundUser);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// Create new user
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const createdUser: User = {
		id: uuidV4(),
		firstName: req.body.firstName || "",
		lastName: req.body.lastName || "",
		email: req.body.email || "",
	};

	if (!createdUser.firstName || createdUser.firstName.length === 0) {
		throw new BadRequestError({
			code: 400,
			message: `Please include a first name!`,
			logging: false,
		});
	}
	if (!createdUser.lastName || createdUser.lastName.length === 0) {
		throw new BadRequestError({
			code: 400,
			message: `Please include a last name!`,
			logging: false,
		});
	}
	if (!createdUser.email || createdUser.email.length === 0) {
		throw new BadRequestError({
			code: 400,
			message: `Please include an email!`,
			logging: false,
		});
	}

	try {
		const updateResult = await query(
			"INSERT INTO users (user_id, user_firstName, user_lastName, user_email) VALUES ($1, $2, $3, $4)",
			[
				createdUser.id,
				createdUser.firstName,
				createdUser.lastName,
				createdUser.email,
			]
		);
		if (updateResult.rowCount === 0) {
      throw new BadRequestError({
        code: 500,
        message: `The user was not able to be created`,
        logging: false,
      });
    }
		res.status(201).json({ message: "User created successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error " });
	}
});

// Update user
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid = req.params.id;
		const getResult = await query("SELECT * FROM users WHERE user_id = $1", [
			uid,
		]);
		const foundUser = getResult.rows[0];

		if (!foundUser) {
			throw new BadRequestError({
				code: 404,
				message: `A user with the id of ${uid} was not found`,
				logging: false,
			});
		}
		const updatedUser: User = {
			id: foundUser.user_id,
			firstName: req.body.firstName ?? foundUser.user_firstName,
			lastName: req.body.lastName ?? foundUser.user_lastName,
			email: req.body.email ?? foundUser.user_email,
		};
		const putResult = await query(
			"UPDATE users SET user_firstName = $2, user_lastName = $3, user_email = $4 WHERE user_id = $1",
			[updatedUser.id, updatedUser.firstName, updatedUser.lastName, updatedUser.email]
		);

		if (putResult.rowCount === 0) {
      throw new BadRequestError({
        code: 404,
        message: `A user with the id of ${uid} was not found`,
        logging: false,
      });
    }
		res.status(200).json({ message: "User updated successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal Server Error" });
	}

	
});

// Delete user
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try { 
		const uid = req.params.id;

		const deleteResult = await query('DELETE FROM users WHERE user_id = $1', [uid]);

		if (deleteResult.rowCount === 0) {
			throw new BadRequestError({
				code: 404,
				message: `A user with the id of ${uid} was not found`,
				logging: false,
			});
		}
	
		res.status(200).json({ message: "User deleted successfully" });

	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Internal Server Error" });
	}
	
});

export default router;
