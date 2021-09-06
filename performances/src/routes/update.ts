import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
	requireAuth,
	validateRequest,
	NotFoundError,
	NotAuthorizedError,
} from "@talent-org/common";

import { Performance } from "../models/performance";
import { Employee } from "../models/employee";

const router = express.Router();

//requireAuth and currentUser middleware should be used together.
//We are using currentUser middleware in the app.ts file.
router.put(
	"/api/performances/:id",
	requireAuth,
	[
		body("feedback").not().isEmpty().withMessage("Feedback is required"),
		body("rating").not().isEmpty().withMessage("Rating is required"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { feedback, rating } = req.body;

		const performance = await Performance.findById(req.params.id);
		if (!performance) {
			throw new NotFoundError();
		}

		const submittedBy = await Employee.findById(req.currentUser!.id);
		if (!submittedBy) {
			throw new NotFoundError();
		}

		if (performance.employee.reportsTo !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		performance.set({
			feedback,
			rating,
			submittedBy,
		});
		await performance.save();

		res.send(performance);
	}
);

export { router as updatePerformanceRouter };
