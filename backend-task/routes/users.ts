import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import BadRequestError from "../middleware/errorTypes/BadRequestError";
import { query } from "../database/db";

const router = express.Router();


type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

type SQLUser = {
	user_id: string,
	user_firstname: string,
	user_lastname: string,
	user_email: string,
	user_password: string,
}

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

/**
 * Get user details.
 * 
 * @route GET api/users/
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the user with the specified ID is not found
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.query.limit && typeof req.query.limit == "string") {
			const queryLimit: number = parseInt(req.query.limit);

			if (isNaN(queryLimit) || queryLimit <= 0 || queryLimit > Number.MAX_SAFE_INTEGER) {
				throw new BadRequestError({
					code: 400,
					message: `Please enter a positive number for the limit`,
				});
			}
			const getLimitResult = await query("SELECT * FROM users LIMIT $1", [
				queryLimit,
			]);
			return res.status(200).json(getLimitResult.rows);
		}

		const getResult = await query("SELECT * FROM users");

		res.status(200).json(getResult.rows);
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Get a specific user 
 * 
 * @route GET api/users/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the user with the specified ID is not found
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid: string = req.params.id;
		const result = await query("SELECT * FROM users WHERE user_id = $1", [uid]);
		const foundUser: User = result.rows[0];

		if (!foundUser) {
			throw new BadRequestError({
				code: 404,
				message: `A user with the id of '${uid}' was not found`,
			});
		}
		res.status(200).json(foundUser);
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Create user details.
 * 
 * @route POST api/users
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the user with the specified ID is not found
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const createdUser: User = {
		id: uuidV4(),
		firstName: req.body.firstName || "",
		lastName: req.body.lastName || "",
		email: req.body.email || "",
		password: req.body.password || "",
	};

	if (!createdUser.firstName || createdUser.firstName.length === 0) {
		throw new BadRequestError({
			code: 400,
			message: `Please include a first name!`,
		});
	}
	if (!createdUser.lastName || createdUser.lastName.length === 0) {
		throw new BadRequestError({
			code: 400,
			message: `Please include a last name!`,
		});
	}
	if (!createdUser.email || createdUser.email.length === 0) {
		throw new BadRequestError({
			code: 400,
			message: `Please include an email!`,
		});
	}
	if (!createdUser.password || createdUser.password.length < 8) {
		throw new BadRequestError({
			code: 400,
			message: "Passwords must be at least 8 characters!",
		})
	}

	try {
		const updateResult = await query(
			"INSERT INTO users (user_id, user_firstName, user_lastName, user_email, user_password) VALUES ($1, $2, $3, $4, $5)",
			[
				createdUser.id,
				createdUser.firstName,
				createdUser.lastName,
				createdUser.email,
				createdUser.password,
			]
		);
		if (updateResult.rowCount === 0) {
			throw new BadRequestError({
				code: 500,
				message: `The user was not able to be created`,
			});
		}
		res.status(201).json({ message: `User with id '${createdUser.id}' was created successfully` });
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Update user details.
 * 
 * @route PUT api/users/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the user with the specified ID is not found
 */
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid = req.params.id;
		const getResult = await query("SELECT * FROM users WHERE user_id = $1", [
			uid,
		]);
		const foundUser: SQLUser = getResult.rows[0];

		if (!foundUser) {
			throw new BadRequestError({
				code: 404,
				message: `A user with the id of '${uid}' was not found`,
			});
		}
		const updatedUser: User = {
			id: foundUser.user_id,
			firstName: req.body.firstName ?? foundUser.user_firstname,
			lastName: req.body.lastName ?? foundUser.user_lastname,
			email: req.body.email ?? foundUser.user_email,
			password: req.body.password ?? foundUser.user_password,
		};
		const putResult = await query(
			"UPDATE users SET user_firstName = $2, user_lastName = $3, user_email = $4 WHERE user_id = $1",
			[
				updatedUser.id,
				updatedUser.firstName,
				updatedUser.lastName,
				updatedUser.email,
			]
		);

		if (putResult.rowCount === 0) {
			throw new BadRequestError({
				code: 500,
				message: `The user with id ${uid} was not able to be updated`,
			});
		}
		res.status(200).json({ message: `User with id '${uid}' was updated successfully` });
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Delete a user.
 * 
 * @route DELETE api/users/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the user with the specified ID is not found
 */
router.delete("/:id",	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const uid = req.params.id;

			const deleteResult = await query("DELETE FROM users WHERE user_id = $1", [uid]);

			if (deleteResult.rowCount === 0) {
				throw new BadRequestError({
					code: 404,
					message: `A user with the id of '${uid}' was not found`,
				});
			}

			res.status(200).json({ message: `User with id of '${uid}' was deleted successfully` });

		} catch (err) {
			console.error("Error querying data:", err);
			next(err);
		}
	}
);

export default router;
