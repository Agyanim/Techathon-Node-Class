const LendModel = require("../models/lendModel");
const { interestCalculator } = require("./simpleInterest");

const interestRate = 5; //in percentage
exports.lendMoneyService = async (accountNumber, amount, duration) => {
	const interest = interestCalculator(interestRate, duration, amount);
	const amountToPay = amount + interest;
	const lend = new LendModel({
        accountNumber,
		amount,
		duration,
		interest: interestRate,
		total: amountToPay,
	});
	await lend.save();
    return lend
};

exports.getLendsService= async()=>{
    const lends=await LendModel.find()
    return lends
}