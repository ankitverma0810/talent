import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { RatingType } from "@talent-org/common";

import { EmployeeDoc } from "./employee";

//An interface that describes the properties that are required to create a new user.
interface PerformanceAttrs {
	employee: EmployeeDoc;
	feedback: string;
	rating: RatingType;
	submittedBy: EmployeeDoc;
}

//An interface that describes the properties that a user model has
//model represents entire collection of data
interface PerformanceModel extends mongoose.Model<PerformanceDoc> {
	build(attrs: PerformanceAttrs): PerformanceDoc;
}

//An interface that describes the properties that a user document has
//document represents a single record
export interface PerformanceDoc extends mongoose.Document {
	employee: EmployeeDoc;
	feedback: string;
	rating: RatingType;
	submittedBy: EmployeeDoc;
}

const performanceSchema = new mongoose.Schema(
	{
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
		feedback: {
			type: String,
			required: true,
		},
		rating: {
			type: String,
			required: true,
			enum: Object.values(RatingType),
		},
		submittedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
		timestamps: true,
	}
);

// Setting updateIfCurrentPlugin and telling mongoose to rename versionKey i.e. __V to version
// updateIfCurrentPlugin only works while updating records. It check the version of the record and accordinly update the same.
performanceSchema.set("versionKey", "version");
performanceSchema.plugin(updateIfCurrentPlugin);

//adding additional build method to our user model.
//Remember the entire goal of this build function was to just allow typescript to do some validation or type checking on the properties we were trying to use to create a new record.
performanceSchema.statics.build = (attrs: PerformanceAttrs) => {
	return new Performance(attrs);
};

const Performance = mongoose.model<PerformanceDoc, PerformanceModel>(
	"Performance",
	performanceSchema
);

export { Performance };
