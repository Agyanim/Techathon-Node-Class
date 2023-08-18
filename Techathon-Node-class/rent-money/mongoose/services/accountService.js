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

exports.findBioInfoByAccountId = async (accountId) => {
	const findAccount = await BioInfoModel.findOne(
		{ accountId: accountId }
		
	);
	return findAccount;
};
exports.deleteAccountService = async (accountId) => {
	const deletedAccount = await AccountModel.findByIdAndDelete(accountId);
	return deletedAccount;
};

exports.updateAccountService = async (
	name,
	address,
	findAccount
) => {
	const accountId=findAccount._id
	name !== undefined ? (findAccount.name = name) : findAccount;
	address !== undefined ? (findAccount.address = address) : findAccount;
	const updatedAccount = await AccountModel.findByIdAndUpdate(
		accountId,
		findAccount,
		{ new: true }
	);
	return updatedAccount;
};
exports.addBioInfoService = async (
	firstName,
	lastName,
	phone,
	occupation,
	accountId
) => {
	const bioInfo = new BioInfoModel({
		accountId,
		firstName,
		lastName,
		phone,
		occupation,
	});
	await bioInfo.save();
	return bioInfo;
};

exports.updateBioInfoService = async (
	firstName,
	lastName,
	phone,
	occupation,
	accountId,
	findAccount
) => {
	firstName !== undefined ? (findAccount.firstName = firstName) : findAccount;
	lastName !== undefined ? (findAccount.lastName = lastName) : findAccount;
	phone !== undefined ? (findAccount.phone = phone) : findAccount;
	occupation !== undefined
		? (findAccount.occupation = occupation)
		: findAccount;
	const updatedBioInfo = await BioInfoModel.findOneAndUpdate(
		{accountId:accountId},
		findAccount,
		{ new: true }
	);
	return updatedBioInfo
};

exports.bioInfoExtendedService=async()=>{
	return await BioInfoModel.aggregate([{
		$lookup:{
			from:"accounts",
			localField:"accountId",
			foreignField:"_id",
			as:"Account"
		},
		
	},
	
	{
		$project:{
			__v:0,
			Account:{
				_id:0,
				__v:0
			}	
			}
	}
	
]).exec()
	// console.log(result[0]);
}
// 