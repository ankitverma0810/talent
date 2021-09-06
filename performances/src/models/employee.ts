import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

//An interface that describes the properties that are required to create a new user.
interface EmployeeAttrs {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	reportsTo?: string;
}

//An interface that describes the properties that a user model has
//model represents entire collection of data
interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
	build(attrs: EmployeeAttrs): EmployeeDoc;
	findByEvent(event: {
		id: string;
		version: number;
	}): Promise<EmployeeDoc | null>;
}

//An interface that describes the properties that a user document has
//document represents a single record
export interface EmployeeDoc extends mongoose.Document {
	firstname: string;
	lastname: string;
	email: string;
	reportsTo?: string;
	version: number;
}

const employeeSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		reportsTo: {
			type: String,
			default: null,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

// Setting updateIfCurrentPlugin and telling mongoose to rename versionKey i.e. __V to version
// updateIfCurrentPlugin only works while updating records. It check the version of the record and accordinly update the same.
employeeSchema.set("versionKey", "version");
employeeSchema.plugin(updateIfCurrentPlugin);

// If you want to define any method inside model then use 'statics' property inside schema.
// adding additional 'build' and 'findByEvent' methods to our user model.
employeeSchema.statics.findByEvent = (event: {
	id: string;
	version: number;
}) => {
	return Employee.findOne({
		_id: event.id,
		version: event.version - 1,
	});
};

//adding additional build method to our user model.
//Remember the entire goal of this build function was to just allow typescript to do some validation or type checking on the properties we were trying to use to create a new record.
employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
	return new Employee({
		_id: attrs.id,
		firstname: attrs.firstname,
		lastname: attrs.lastname,
		email: attrs.email,
	});
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
	"Employee",
	employeeSchema
);

export { Employee };
