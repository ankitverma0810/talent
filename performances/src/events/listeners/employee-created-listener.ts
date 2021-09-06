import { Message } from "node-nats-streaming";
import { Subjects, Listener, EmployeeCreatedEvent } from "@talent-org/common";

import { Employee, EmployeeDoc } from "../../models/employee";
import { queueGroupName } from "./queue-group-name";

export class EmployeeCreatedListener extends Listener<EmployeeCreatedEvent> {
	subject: Subjects.EmployeeCreated = Subjects.EmployeeCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: EmployeeCreatedEvent["data"], msg: Message) {
		const { id, firstname, lastname, email, reportsTo } = data;
		
		const employee = Employee.build({
			id,
			firstname,
			lastname,
			email,
			reportsTo
		});
		await employee.save();

		msg.ack();
	}
}
