import express, { Request, Response } from "express";
import { requireAuth, RoleType } from "@talent-org/common";

import { Employee } from "../models/employee";

const router = express.Router();

router.get(
	"/api/employees",
	requireAuth,
	async (req: Request, res: Response) => {
		const role = req.currentUser?.role;
		let employees;
		if (role === RoleType.Admin) {
			employees = await Employee.find({}).populate({ path: "reportsTo" });
		} else {
			employees = await Employee.find({
				reportsTo: req.currentUser?.id,
			}).populate({ path: "reportsTo" });
		}
		res.send(employees);
	}
);

export { router as indexEmployeeRouter };
