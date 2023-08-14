const { model, Schema } = require("mongoose");

const accountSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		accountNumber: {
			type: Number,
			required: true,
			unique: true,
			index: true,
		},
	},
    { timestamps: true }
);
const AccountModel=model("Account", accountSchema);
module.exports = AccountModel
