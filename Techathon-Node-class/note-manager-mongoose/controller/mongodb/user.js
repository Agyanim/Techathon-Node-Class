const User = require("../model/user");
const { HashPassword } = require("../util/password");
const { pgClient } = require("../util/pgConnection");

exports.createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ message: "All field must be provided" });
		}
		const hashPassword = await HashPassword(password);
		const user = new User({
			firstName,
			lastName,
			email,
			password: hashPassword,
			createdON: new Date().toLocaleString(),
			modifiedON: new Date().toLocaleString(),
		});
		await user.save();
		return res.status(400).json({ message: "Success", user });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(400).json({ message: "Success", users });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.getUserById = async (req, res, userId) => {
	userId = req.params.id;
	try {
		if (!userId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		const user = await User.findOne({ _id: userId });
		return res.status(400).json({ message: "Success", user });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.updateUser = async (req, res, userId) => {
	console.log(req.body);
	const { firstName, lastName, email } = req.body;
	userId = req.params.id;
	try {
		if (!userId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		let user = await User.findOne({ _id: userId });
		console.log(user);
		firstName !== undefined
			? (user.firstName = firstName)
			: (user.firstName = user.firstName);
		lastName !== undefined
			? (user.lastName = lastName)
			: (user.lastName = user.lastName);
		email !== undefined ? (user.email = firstName) : (user.email = user.email);
		user.password = user.password;
		user.createdON = user.createdON;
		user.modifiedON = new Date().toLocaleString();
		user = await User.findOneAndUpdate({ _id: userId }, user, {
			new: true,
		});
		return res.status(400).json({ message: "Success", user });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.deleteUser = async (req, res, userId) => {
	userId = req.params.id;
	try {
		if (!userId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		const user = await User.findOne({ _id: userId });
		if (!user) {
			return res.status(400).json({ message: "Sorry, no record found" });
		}
		await User.deleteOne({ _id: userId });
		return res.status(400).json({ message: "Record deleted successfully" });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
