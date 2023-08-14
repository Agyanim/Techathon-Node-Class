const { lendMoneyService, getLendsService } = require("../services/lendService");
exports.lendMoney = async (req, res) => {
	const { accountNumber, amount, duration } = req.body;
	try {
		if (!amount || !accountNumber || !duration) {
			return res.status(401).send("All fields must be provided");
		}
		const lend = await lendMoneyService(accountNumber, amount, duration);
		return res.status(200).json({ message: "Transaction successful", lend });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.getAllLends=async(req,res)=>{
try {
	const lends= await getLendsService()
	res.status(200).json({lends})
} catch (error) {
	res.status(500).json({Error:error.message})
}
}
