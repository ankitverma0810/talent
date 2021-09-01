import express, { Request, Response } from "express";

import { Employee } from "../models/employee";

const router = express.Router();

router.get("/api/employees", async (req: Request, res: Response) => {
	const employees = await Employee.find({});
	res.send(employees);
});

export { router as indexEmployeeRouter };
