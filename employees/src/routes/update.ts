import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
	requireAuth,
	validateRequest,
	NotFoundError,
} from "@talent-org/common";

import { natsWrapper } from "../nats-wrapper";
import { Employee, EmployeeDoc } from "../models/employee";
import { EmployeeUpdatedPublisher } from "../events/publishers/employee-updated-publisher";

const router = express.Router();

//requireAuth and currentUser middleware should be used together.
//We are using currentUser middleware in the app.ts file.
router.put(
	"/api/employees/:id",
	requireAuth,
	[
		body("firstname").not().isEmpty().withMessage("Firstname is required"),
		body("lastname").not().isEmpty().withMessage("Lastname is required"),
		body("designation")
			.not()
			.isEmpty()
			.withMessage("Designation is required"),
		body("email").isEmail().withMessage("Email must be valid"),
		body("role").not().isEmpty().withMessage("Role is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const employee = await Employee.findById(req.params.id);

		if (!employee) {
			throw new NotFoundError();
		}

		let reportsTo: EmployeeDoc | null = null;
		if (req.body.reportsTo) {
			reportsTo = await Employee.findById(req.body.reportsTo);
			if (!reportsTo) {
				throw new Error(`Manager not found ${req.body.reportsTo}`);
			}
		}

		employee.set({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			designation: req.body.designation,
			email: req.body.email,
			role: req.body.role,
			reportsTo: reportsTo!,
		});
		await employee.save();

		await new EmployeeUpdatedPublisher(natsWrapper.client).publish({
			id: employee.id,
			firstname: employee.firstname,
			lastname: employee.lastname,
			email: employee.email,
			reportsTo: employee.reportsTo?._id,
			version: employee.version,
		});

		res.send(employee);
	}
);

export { router as updateEmployeeRouter };
