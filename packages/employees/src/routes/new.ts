import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@talent-org/common";

import { Employee } from "../models/employee";

const router = express.Router();

//requireAuth and currentUser middleware should be used together.
//We are using currentUser middleware in the app.ts file.
router.post(
	"/api/employees",
	requireAuth,
	[
		body("firstname").not().isEmpty().withMessage("Firstname is required"),
		body("lastname").not().isEmpty().withMessage("Lastname is required"),
		body("designation")
			.not()
			.isEmpty()
			.withMessage("Designation is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { firstname, lastname, designation } = req.body;

		const employee = Employee.build({
			firstname,
			lastname,
			designation,
		});
		await employee.save();

		res.status(201).send(employee);
	}
);

export { router as createEmployeeRouter };
