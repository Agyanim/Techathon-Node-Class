const User = require("../../model/user");
const { validatePassword } = require("../../util/password");
exports.auth = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(401)
				.json({ message: "Please provide email and password fields" });
		}
		let user = await User.findOne({ email: email });
		if (user === null) {
			return res.status(201).json({ message: "No record found" });
		}
        const hashPassword=await validatePassword(password,user.password)
		if (!hashPassword) {
			return res.status(201).json({ message: "provide valid password" });
		}
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
