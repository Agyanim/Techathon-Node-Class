const express = require("express");
const {
	createAccount,
	getAllAccount,
	deleteAccount,
	findAccountById,
	updateAccount,
} = require("../controllers/accountController");
const accountRoute = express.Router();

accountRoute.route("/").post(createAccount).get(getAllAccount);// this helps to avoid repetition
accountRoute
	.route("/:accountId")
	.delete(deleteAccount)
	.put(updateAccount)
	.get(findAccountById);

module.exports = accountRoute;
