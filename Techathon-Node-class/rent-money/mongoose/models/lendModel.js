const { model, Schema } = require("mongoose");

const lendSchema = new Schema(
	{
		accountNumber:{
				type:Number,
				required:true,
				index:true
		},
		amount: {
			type: Number,
			required: true,
		},
		duration:{
			type:Number,
			required:true
		},
		interest: {
			type: Number,
			required: true,
		},
		paid: {
			type: Boolean,
			required: true,
			default: false,
		},
		total: {
			type: Number,
			required: true,
		},
		accountId: {//this becomes a foreign key(a primary key in Account collection)
			type: Schema.Types.ObjectId,
			ref: "Account",
		},
	},
	{ timestamps: true }
);
const LendModel = model("Lend", lendSchema);
module.exports = LendModel;
