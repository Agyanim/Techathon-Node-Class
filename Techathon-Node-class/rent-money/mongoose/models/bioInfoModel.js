const { model, Schema } = require("mongoose");

const bioInfoSchema = new Schema(
	{
		accountId: {
			type: Schema.Types.ObjectId,
			ref: "Account",
			required: true,

		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		phone: {
			type: String,
		},
		occupation: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = BioInfoSModel = model("BioInfo", bioInfoSchema);
