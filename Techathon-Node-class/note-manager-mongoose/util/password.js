const bcrypt = require("bcrypt");
exports.HashPassword = async (password) => {
	// const number = Math.floor(Math.random() * 10);
	try {
		const saltRounds = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, saltRounds);
		return hash;
	} catch (error) {
		console.log(error.message);
	}
};

exports.validatePassword = async (password, hashPassword) => {
	try {
		const response = await bcrypt.compare(password, hashPassword);
		return response;
	} catch (error) {
		console.log(error.message);
	}
};
