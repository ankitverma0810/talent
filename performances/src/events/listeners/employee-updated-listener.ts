import { Message } from "node-nats-streaming";
import { Subjects, Listener, EmployeeUpdatedEvent } from "@talent-org/common";

import { Employee } from "../../models/employee";
import { queueGroupName } from "./queue-group-name";

export class EmployeeUpdatedListener extends Listener<EmployeeUpdatedEvent> {
	subject: Subjects.EmployeeUpdated = Subjects.EmployeeUpdated;
	queueGroupName = queueGroupName;

	async onMessage(data: EmployeeUpdatedEvent["data"], msg: Message) {
		const { firstname, lastname, email, reportsTo } = data;

		const employee = await Employee.findByEvent(data);
		if (!employee) {
			throw new Error("Employee not found");
		}

		employee.set({ firstname, lastname, email, reportsTo });
		await employee.save();

		msg.ack();
	}
}
