import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

//An interface that describes the properties that are required to create a new user.
interface EmployeeAttrs {
	firstname: string;
	lastname: string;
	designation: string;
}

//An interface that describes the properties that a user model has
//model represents entire collection of data
interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
	build(attrs: EmployeeAttrs): EmployeeDoc;
}

//An interface that describes the properties that a user document has
//document represents a single record
interface EmployeeDoc extends mongoose.Document {
	firstname: string;
	lastname: string;
	designation: string;
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
		designation: {
			type: String,
			required: true,
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

//adding additional build method to our user model.
//Remember the entire goal of this build function was to just allow typescript to do some validation or type checking on the properties we were trying to use to create a new record.
employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
	return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
	"Employee",
	employeeSchema
);

export { Employee };
