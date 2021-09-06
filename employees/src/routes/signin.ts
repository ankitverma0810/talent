import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@talent-org/common";

import { Employee } from "../models/employee";
import { Password } from "./../services/password";

const router = express.Router();

router.post(
	"/api/employees/signin",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.notEmpty()
			.withMessage("You must supply a password"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingEmployee = await Employee.findOne({ email });
		if (!existingEmployee) {
			throw new BadRequestError("Invalid credentials");
		}

		const passwordMatch = await Password.compare(
			existingEmployee.password,
			password
		);
		if (!passwordMatch) {
			throw new BadRequestError("Invalid credentials");
		}

		//Generate JWT
		//process.env.JWT_KEY: name of the key we have defined in our deployment yaml file.
		const userJwt = jwt.sign(
			{
				id: existingEmployee.id,
				email: existingEmployee.email,
				firstname: existingEmployee.firstname,
				lastname: existingEmployee.lastname,
				role: existingEmployee.role,
			},
			process.env.JWT_KEY!
		);

		//Store it on session object
		// Generate JSON web token and then we store it on that session object. Remember that such an object is going to be turned into a string by Cookie session. A cookie session Middleware is then going to attempt to send this cookie back over to the user's browser
		req.session = {
			jwt: userJwt,
		};

		res.status(200).send(existingEmployee);
	}
);

export { router as signinRouter };
