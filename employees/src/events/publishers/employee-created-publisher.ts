import { Publisher, Subjects, EmployeeCreatedEvent } from '@talent-org/common';

export class EmployeeCreatedPublisher extends Publisher<EmployeeCreatedEvent> {
    subject: Subjects.EmployeeCreated = Subjects.EmployeeCreated;
}