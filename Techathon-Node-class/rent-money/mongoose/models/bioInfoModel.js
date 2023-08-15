const { model, Schema } = require("mongoose");

const bioInfoSchema = new Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			ref: "Account",
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		occupation: {
			type: String,
			required: true,
		},
	},
	{ timestamp: true }
);

module.exports = BioInfoSModel = model("BioInfo", bioInfoSchema);
