import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
	requireAuth,
	validateRequest,
	NotFoundError,
} from "@talent-org/common";

import { Employee } from "../models/employee";

const router = express.Router();

//requireAuth and currentUser middleware should be used together.
//We are using currentUser middleware in the app.ts file.
router.put(
	"/api/tickets/:id",
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
		const employee = await Employee.findById(req.params.id);

		if (!employee) {
			throw new NotFoundError();
		}

		employee.set({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			designation: req.body.designation,
		});
		await employee.save();

		res.send(employee);
	}
);

export { router as updateEmployeeRouter };
