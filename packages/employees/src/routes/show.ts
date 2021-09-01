import express, { Request, Response } from "express";
import { NotFoundError } from "@talent-org/common";

import { Employee } from "../models/employee";

const router = express.Router();

router.get("/api/employees/:id", async (req: Request, res: Response) => {
	const employee = await Employee.findById(req.params.id);
	if (!employee) {
		throw new NotFoundError();
	}
	res.send(employee);
});

export { router as showEmployeeRouter };
