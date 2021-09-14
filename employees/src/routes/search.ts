import express, { Request, Response } from "express";
import { requireAuth } from "@talent-org/common";

import { Employee } from "../models/employee";

const router = express.Router();

router.get(
	"/api/employees/search/:value",
	requireAuth,
	async (req: Request, res: Response) => {
		const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
  		const searchRgx = rgx(req.params.value);
		
		const employees = await Employee.find({
			$or: [
				{ firstname: { $regex: searchRgx, $options: "i" }  },
				{ lastname: { $regex: searchRgx, $options: "i" }  },
				{ email: { $regex: searchRgx, $options: "i" } },
			],
		})
			.populate({ path: "reportsTo" })
			.select(["firstname", "lastname", "email", "-reportsTo"]);
		res.send(employees);
	}
);

export { router as searchEmployeeRouter };
