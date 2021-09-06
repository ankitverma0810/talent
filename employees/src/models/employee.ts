import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { RoleType } from "@talent-org/common";

import { Password } from "./../services/password";

//An interface that describes the properties that are required to create a new user.
interface EmployeeAttrs {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	designation?: string;
	role?: RoleType;
	reportsTo?: EmployeeDoc;
}

//An interface that describes the properties that a user model has
//model represents entire collection of data
interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
	build(attrs: EmployeeAttrs): EmployeeDoc;
}

//An interface that describes the properties that a user document has
//document represents a single record
export interface EmployeeDoc extends mongoose.Document {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	designation?: string;
	role: RoleType;
	reportsTo?: EmployeeDoc;
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
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			enum: Object.values(RoleType),
			default: RoleType.Admin,
		},
		reportsTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			default: null,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
			},
		},
		timestamps: true,
	}
);

//using pre-hook
employeeSchema.pre("save", async function (done) {
	if (this.isModified("password")) {
		const hashed = await Password.toHash(this.get("password"));
		this.set("password", hashed);
	}
	done();
});

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
