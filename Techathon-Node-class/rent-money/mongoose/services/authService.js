const AccountModel = require("../models/accountModel");

exports.authService = async (accountNumber) => {
	const findAccount = await AccountModel.findOne({
		accountNumber: accountNumber,
	});
	return findAccount;
};
