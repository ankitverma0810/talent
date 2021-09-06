import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@talent-org/common";

import { natsWrapper } from "../nats-wrapper";
import { Employee } from "../models/employee";
import { EmployeeCreatedPublisher } from "../events/publishers/employee-created-publisher";

const router = express.Router();

router.post(
	"/api/employees/signup",
	[
		body("firstname").not().isEmpty().withMessage("Firstname is required"),
		body("lastname").not().isEmpty().withMessage("Lastname is required"),
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 charaters"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { firstname, lastname, email, password } = req.body;

		//checking if email already in use
		const existingEmployee = await Employee.findOne({ email });
		if (existingEmployee) {
			throw new BadRequestError("Email in use");
		}

		//saving the user
		const employee = Employee.build({
			firstname,
			lastname,
			email,
			password,
		});
		await employee.save();

		await new EmployeeCreatedPublisher(natsWrapper.client).publish({
			id: employee.id,
			firstname: employee.firstname,
			lastname: employee.lastname,
			email: employee.email,
			reportsTo: employee.reportsTo?._id,
			version: employee.version,
		});

		//Generate JWT
		//process.env.JWT_KEY: name of the key we have defined in our deployment yaml file.
		const userJwt = jwt.sign(
			{
				id: employee.id,
				email: employee.email,
				firstname: employee.firstname,
				lastname: employee.lastname,
				role: employee.role,
			},
			process.env.JWT_KEY!
		);

		//Store it on session object
		// Generate JSON web token and then we store it on that session object. Remember that such an object is going to be turned into a string by Cookie session. A cookie session Middleware is then going to attempt to send this cookie back over to the user's browser
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(employee);
	}
);

export { router as signupRouter };
