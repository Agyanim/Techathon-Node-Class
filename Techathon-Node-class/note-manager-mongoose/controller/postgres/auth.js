const { validatePassword } = require("../../util/password");
const { pgClient } = require("../../util/pgConnection");
exports.auth = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(401)
				.json({ message: "Please provide email and password fields" });
		}
		const sqlQuery = `
		SELECT * FROM  user_tbl
		WHERE email=$1
		`;
		const VALUES = [email];
		const user = (await pgClient.query(sqlQuery, VALUES)).rows[0];
		if (!user) {
			return res.status(201).json({ message: "No record found" });
		}
		const hashPassword = await validatePassword(password, user.password); // this returns true when password match
		if (!hashPassword) {
			return res.status(201).json({ message: "provide valid password" });
		}
		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
