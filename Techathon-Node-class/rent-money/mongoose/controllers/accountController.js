const bioInfoModel = require("../models/bioInfoModel");
const {
	createAccountService,
	getAllAccountService,
	findAccountByIdService,
	deleteAccountService,
	updateAccountService,
	addBioInfoService,
	findBioInfoByAccountId,
	updateBioInfoService,
	bioInfoExtendedService,
} = require("../services/accountService");

exports.createAccount = async (req, res) => {
	const { accountName, address } = req.body;

	try {
		if (!accountName || !address) {
			return res.status(400).json("All field must be provided");
		}
		const account = await createAccountService(accountName, address);
		return res.status(200).json({ account });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};

exports.getAllAccount = async (req, res) => {
	try {
		const allAccount = await getAllAccountService();
		res.status(200).json({ allAccount });
	} catch (error) {
		res.status(500).json({ Error: error.message });
	}
};
exports.deleteAccount = async (req, res, accountId) => {
	accountId = req.params.accountId;
	try {
		if (!accountId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		const user = await findAccountByIdService(accountId);
		if (!user) {
			return res.status(401).json({ message: "Sorry, no record found" });
		}
		const deletedAccount = await deleteAccountService(accountId);
		return res
			.status(200)
			.json({ message: "Record deleted successfully", deletedAccount });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.findAccountById = async (req, res, accountId) => {
	try {
		accountId = req.params.accountId;
		if (!accountId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		const account = await findAccountByIdService(accountId);
		if (!account) {
			return res.status(400).json({ message: "Sorry, no record found" });
		}
		return res.status(200).json({ account });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.updateAccount = async (req, res, accountId) => {
	accountId = req.params.accountId;
	const { accountName, address } = req.body;
	try {
		if (!accountId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		const findAccount = await findAccountByIdService(accountId);
		if (!findAccount) {
			return res.status(400).json({ message: "Sorry, no record found" });
		}

		const updatedAccount = await updateAccountService(
			accountId,
			accountName,
			address,
			findAccount
		);
		return res.status(200).json({ updatedAccount });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};


exports.addBioInfo=async(req,res)=>{
	try {
		const {firstName,lastName,phone,occupation,accountId}=req.body
		if(!accountId){
			return res.status(401).json("Sorry,account id must be provided")
		}
		const bioInfo=await addBioInfoService(firstName,lastName,phone,occupation,accountId)
		 res.status(200).json({bioInfo})
	
	} catch (error) {
		res.status(500).json({Error:error.message})
	}
}
exports.getBioInfo=async(req,res,accountId)=>{
	try {
		accountId=req.params.accountId
		if(!accountId){
			return res.status(400).json("Please account id must be provided")
		}
		const bioInfo=await findBioInfoByAccountId(accountId)
		if(!bioInfo){
			return res.status(401).json("Sorry, no record found")
		}
		res.status(200).json({bioInfo})
	} catch (error) {
		res.status(500).json({Error:error.message})
	}
}

exports.updateBioInfo=async(req,res,accountId)=>{
	try {
		accountId=req.params.accountId
	const {firstName,lastName,occupation,phone}=req.body

	if (!firstName || !lastName || !accountId){
		return res.status(401).json("First Name, Last Name and AccountId must be provided")
	}
	const findAccount= await findBioInfoByAccountId(accountId)
	console.log(findAccount);
	
	if (findAccount){
		const updateAccount= await updateBioInfoService(firstName,lastName,occupation,phone,accountId,findAccount)
		return res.status(200).json({updateAccount})
	}
	
} catch (error) {
	res.status(500).json({Error:error.message})
}


}

exports.getBioInfoExtended=async(req,res)=>{
	try {
		const result =await bioInfoExtendedService()
		if (result){
			res.status(200).json(result)
		}
	} catch (error) {
		res.status(500).json({Error:error.message})
	}
}
exports.getBioInfoExtendedById=async(req,res,id)=>{
	id=req.params.accountId
	try {
		const result =await bioInfoExtendedService()
		if (result){
		const data=	result.find(account=>account.accountId==id)
			res.status(200).json(data)
		}
	} catch (error) {
		res.status(500).json({Error:error.message})
	}
}