import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth } from "@talent-org/common";

import { natsWrapper } from "../nats-wrapper";
import { Employee, EmployeeDoc } from "../models/employee";
import { EmployeeCreatedPublisher } from "../events/publishers/employee-created-publisher";

const router = express.Router();

router.post(
	"/api/employees",
	[
		body("firstname").not().isEmpty().withMessage("Firstname is required"),
		body("lastname").not().isEmpty().withMessage("Lastname is required"),
		body("designation")
			.not()
			.isEmpty()
			.withMessage("Designation is required"),
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage("Password must be between 4 and 20 charaters"),
		body("role").not().isEmpty().withMessage("Role is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { firstname, lastname, designation, email, password, role } = req.body;

		let reportsTo: EmployeeDoc | null = null;
		if (req.body.reportsTo) {
			reportsTo = await Employee.findById(req.body.reportsTo);
			if (!reportsTo) {
				throw new Error(`Manager not found ${req.body.reportsTo}`);
			}
		}

		const employee = Employee.build({
			firstname,
			lastname,
			designation,
			email,
			password,
			role,
			reportsTo: reportsTo!,
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

		res.status(201).send(employee);
	}
);

export { router as createEmployeeRouter };
