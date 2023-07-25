const { readFile } = require("fs");
const cuid = require("cuid");
const { writeToFile } = require("./handlingFiles");

exports.createAccount = (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const account = {
		userId: cuid(),
		firstName: firstName,
		lastName: lastName,
		password: password,
		email: email.toLowerCase(),
		createdOn: new Date().toDateString().replace(/U/, " ").replace(/\..+/, ""),
		modifiedOn: new Date().toDateString().replace(/U/, " ").replace(/\..+/, ""),
	};

	if (!firstName || !lastName || !password || !email) {
		return res.status(400).json({ message: "Sorry, all field are required" });
	}

	readFile("./account.json", "utf-8", (err, data) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		data = JSON.parse(data);
		data.push(account);
		writeToFile("./account.json", JSON.stringify(data), res);
		return res.status(201).json({ message: "success", account: data });
	});
};

exports.getAllAccount = (req, res) => {
	readFile("./account.json", "utf-8", (err, data) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		data = JSON.parse(data);
		return res.status(200).json({ message: data });
	});
};

exports.getAccountById = (req, res, id) => {
	id = req.params.id;
	if (!id) {
		return res.status(400).json({ message: "User Id must be provided" });
	}
	readFile("./account.json", "utf-8", (err, filedata) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		filedata = JSON.parse(filedata);
		const findUser = filedata.find((user) => user.userId == id);
		if (!findUser) {
			return res.status(200).json({ message: "no record found" });
		}
		return res.status(200).json({ message: "Success", account: findUser });
	});
};

exports.updateAccount = (req, res, id) => {
	id = req.params.id;
	if (!id) {
		return res.status(400).json({ message: "User Id must be provided" });
	}
	readFile("./account.json", "utf-8", (err, filedata) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		filedata = JSON.parse(filedata);
		const findUser = filedata.find((user) => user.userId == id);
		if (!findUser) {
			return res.status(200).json({ message: "no record found" });
		}
		const filteredAccount = filedata.filter((account) => account.userId !== id);

		req.body.firstName !== undefined
			? (findUser.firstName = req.body.firstName)
			: (findUser.firstName = findUser.firstName);
		req.body.lastName !== undefined
			? (findUser.lastName = req.body.lastName)
			: (findUser.lastName = findUser.lastName);
		req.body.email !== undefined
			? (findUser.email = req.body.email)
			: (findUser.email = findUser.email);
		findUser.modifiedOn = new Date()
			.toDateString()
			.replace(/U/, " ")
			.replace(/\..+/, "");
		filteredAccount.push(findUser);
		writeToFile("./account.json", JSON.stringify(filteredAccount), res);
		return res.status(200).json({ message: "Success", account: findUser });
	});
};

exports.deleteAccount = (req, res, id) => {
	id = req.params.id;
	if (!id) {
		return res.status(400).json({ message: "User Id must be provided" });
	}
	readFile("./account.json", "utf-8", (err, filedata) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		filedata = JSON.parse(filedata);
		const filteredAccount = filedata.filter((user) => user.userId !== id);
		writeToFile("./account.json", JSON.stringify(filteredAccount), res);
		return res
			.status(200)
			.json({ message: "Success", account: filteredAccount });
	});
};
