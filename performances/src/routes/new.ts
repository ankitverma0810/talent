import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
	validateRequest,
	requireAuth,
	NotFoundError,
	NotAuthorizedError,
} from "@talent-org/common";

import { Performance } from "../models/performance";
import { Employee } from "../models/employee";

const router = express.Router();

router.post(
	"/api/performances/:id",
	requireAuth,
	[
		body("feedback").not().isEmpty().withMessage("Feedback is required"),
		body("rating").not().isEmpty().withMessage("Rating is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { feedback, rating } = req.body;

		const employee = await Employee.findById(req.params.id);
		if (!employee) {
			throw new NotFoundError();
		}

		if (employee.reportsTo !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		const submittedBy = await Employee.findById(req.currentUser!.id);
		if (!submittedBy) {
			throw new NotFoundError();
		}

		const performance = Performance.build({
			employee,
			feedback,
			rating,
			submittedBy,
		});
		await performance.save();

		res.status(201).send(performance);
	}
);

export { router as createPerformanceRouter };
