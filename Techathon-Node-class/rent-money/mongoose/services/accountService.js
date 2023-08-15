const AccountModel = require("../models/accountModel");
const BioInfoModel = require("../models/bioInfoModel");
const { generateAccountNumber } = require("../services/accountNumber");
exports.createAccountService = async (name, address) => {
	const account = new AccountModel({
		name,
		address,
		accountNumber: generateAccountNumber(),
	});
	await account.save();
	return account;
};

exports.getAllAccountService = async () => {
	const allAccount = await AccountModel.find();
	return allAccount;
};

exports.findAccountByIdService = async (accountId) => {
	const account = await AccountModel.findById(accountId);
	return account;
};

exports.deleteAccountService = async (accountId) => {
	const deletedAccount = await AccountModel.findByIdAndDelete(accountId);
	return deletedAccount;
};

exports.updateAccountService = async (
	accountId,
	name,
	address,
	findAccount
) => {
	name !== undefined ? (findAccount.name = name) : findAccount;
	address !== undefined ? (findAccount.address = address) : findAccount;
	const updatedAccount = await AccountModel.findByIdAndUpdate(
		accountId,
		findAccount,
		{ new: true }
	);
	return updatedAccount;
};
exports.addBioInfoService = async(firstName, lastName, phone, occupation,accountId) => {
	const bioInfo = new BioInfoModel({
		accountId,
		firstName,
		lastName,
		phone,
		occupation,

	});
	await bioInfo.save()
	return bioInfo
};