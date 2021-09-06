import express, { Request, Response } from "express";
import { requireAuth } from "@talent-org/common";

import { Employee } from "../models/employee";

const router = express.Router();

router.get("/api/employees", requireAuth, async (req: Request, res: Response) => {
	const employees = await Employee.find({}).populate({ path: 'reportsTo' });
	res.send(employees);
});

export { router as indexEmployeeRouter };
