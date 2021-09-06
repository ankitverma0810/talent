import { Publisher, Subjects, EmployeeUpdatedEvent } from '@talent-org/common';

export class EmployeeUpdatedPublisher extends Publisher<EmployeeUpdatedEvent> {
    subject: Subjects.EmployeeUpdated = Subjects.EmployeeUpdated;
}