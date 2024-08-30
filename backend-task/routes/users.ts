import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import BadRequestError from "../middleware/errorTypes/BadRequestError";
import logger from "../middleware/logger";
const router = express.Router();

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

let users: User[] = [
	{
		id: "1",
		firstName: "Camden",
		lastName: "Scholl",
		email: "camden@scholl.com",
	},
	{
		id: "2",
		firstName: "Jay",
		lastName: "Bob",
		email: "jay@bob.com",
	},
	{
		id: "3",
		firstName: "Jill",
		lastName: "Blue",
		email: "jill@blue.com",
	},
];

// Get all users
router.get("/", (req: Request, res: Response, next: NextFunction) => {
	// limit
	if (req.query.limit && typeof req.query.limit == "string") {
		const queryLimit: number = parseInt(req.query.limit);

		if (!isNaN(queryLimit) && queryLimit > 0) {
			return res.status(200).json(users.slice(0, queryLimit));
		}
	}
	res.status(200).json(users);
});

// Get single user
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
	const uid: string = req.params.id;
	const foundUser: User | undefined = users.find((u: User) => u.id === uid);

	if (!foundUser) {
		throw new BadRequestError({
			code: 404,
			message: `A user with the id of ${uid} was not found`,
			logging: false,
		});
	}
	res.status(200).json(foundUser);
});

// Create new user
router.post("/", (req: Request, res: Response, next: NextFunction) => {
	const createdUser: User = {
		id: uuidV4(),
		firstName: req.body.firstName || "",
		lastName: req.body.lastName || "",
		email: req.body.email || "",
	};

	if (!createdUser.firstName) {
		throw new BadRequestError({
			code: 400,
			message: `Please include a first name!`,
			logging: false,
		});
	}
	if (!createdUser.lastName) {
		throw new BadRequestError({
			code: 400,
			message: `Please include a last name!`,
			logging: false,
		});
	}
	if (!createdUser.email) {
		throw new BadRequestError({
			code: 400,
			message: `Please include an email!`,
			logging: false,
		});
	}

	users.push(createdUser);

	res.status(201).json(users);
});

// Update user
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
	const uid = req.params.id;
	const foundUser = users.find((u: User) => u.id === uid);

	if (!foundUser) {
		throw new BadRequestError({
			code: 404,
			message: `A user with the id of ${uid} was not found`,
			logging: false,
		});
	}

	foundUser.firstName = req.body.firstName ?? "";
	foundUser.lastName = req.body.lastName ?? "";
	foundUser.email = req.body.email ?? "";
	res.status(200).json(foundUser);
});

// Delete user
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
	const uid = req.params.id;
	const userToDelete = users.find((u: User) => u.id === uid);

	if (!userToDelete) {
		throw new BadRequestError({
			code: 404,
			message: `A user with the id of ${uid} was not found`,
			logging: false,
		});
	}

	users = users.filter((u: User) => u.id !== uid);
	res.status(200).json(users);
});

export default router;
