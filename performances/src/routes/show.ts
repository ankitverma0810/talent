import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@talent-org/common";

import { Performance } from "../models/performance";

const router = express.Router();

router.get(
	"/api/performances/:id",
	requireAuth,
	async (req: Request, res: Response) => {
		const performance = await Performance.findById(req.params.id)
			.populate({ path: "employee" })
			.populate({ path: "submittedBy" });
		if (!performance) {
			throw new NotFoundError();
		}
		res.send(performance);
	}
);

export { router as showPerformanceRouter };
