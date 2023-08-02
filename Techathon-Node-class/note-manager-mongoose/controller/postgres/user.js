const { HashPassword } = require("../../util/password");
const { pgClient } = require("../../util/pgConnection");
const  uuid  = require("uuid");

exports.createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ message: "All field must be provided" });
		}
		const hashPassword = await HashPassword(password);
		const sqlQuery = `
		INSERT INTO 
		user_tbl (user_id,first_name,last_name,email,password,created_on,modified_on)
    	VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
		const createdOn = new Date().toLocaleDateString();
		const modifiedOn = new Date().toLocaleDateString();
		const sqlValues = [
			user_id = uuid.v4(),
			firstName,
			lastName,
			email,
			hashPassword,
			createdOn,
			modifiedOn,
		];
		const user = (await pgClient.query(sqlQuery, sqlValues)).rows[0];
		return res.status(400).json({ message: "Success", user });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const sqlQuery = `SELECT 
		user_id AS "User Id",first_name AS "First Name",last_name AS "Last Name",email AS "Email",created_on AS "Created On",modified_on AS "Modified On"
		FROM user_tbl 
		ORDER BY first_name
		`;
		const users = (await pgClient.query(sqlQuery)).rows;
		return res.status(200).json({ message: "Success", users });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.getUserById = async (req, res, userId) => {
	userId = req.params.id;
	try {
		const sqlQuery = `SELECT
		first_name AS "First Name",last_name AS "Last Name",email AS "Email",created_on AS "Created On",modified_on AS "Modified On"
		FROM user_tbl
    	WHERE 
		user_id=${userId}`;
		const user = (await pgClient.query(sqlQuery)).rows[0];
		if (!user) {
			return res.status(201).json({ message: "No record find" });
		}
		return res.status(200).json({ message: "Success", user });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.updateUser = async (req, res, userId) => {
	let { firstName, lastName, email } = req.body;
	userId = req.params.id;
	try {
		if (!userId) {
			return res.status(400).json({ message: "User id must be provided" });
		}
		const findUserQuery = `
			SELECT *
			FROM user_tbl
			WHERE user_id=${userId}
		`;
		const user = (await pgClient.query(findUserQuery)).rows[0];
		firstName !== undefined ? (user.first_name = firstName) : user.first_name;
		lastName !== undefined ? (user.last_name = lastName) : user.last_name;
		email !== undefined ? (user.email = email) : user.email;
		user.modified_on = new Date().toLocaleString();
		const updateQuery = `
		UPDATE user_tbl 
		SET first_name=$1,last_name=$2,email=$3,modified_on=$4
		WHERE user_id=${userId} 
		RETURNING *
`;
		const updateValues = [
			user.first_name,
			user.last_name,
			user.email,
			user.modified_on,
		];
		const updatedUser = (await pgClient.query(updateQuery, updateValues))
			.rows[0];
		return res.status(400).json({ message: "Success", updatedUser });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
exports.deleteUser = async (req, res, userId) => {
	userId = req.params.id;

	try {
		const sqlQuery = `
			DELETE FROM user_tbl
			WHERE user_id =${userId}
			RETURNING *
		`;
		const user = (await pgClient.query(sqlQuery)).rows[0];
		if (!user) {
			return res.status(400).json({ message: "Sorry, no record found" });
		}
		return res
			.status(400)
			.json({ message: "Record deleted successfully", user });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
