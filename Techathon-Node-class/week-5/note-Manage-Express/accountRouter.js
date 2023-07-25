const express = require("express");
const {
	createAccount,
	getAllAccount,
	getAccountById,
	updateAccount,
	deleteAccount,
} = require("./account");

const accountRouter = express.Router();

accountRouter.post("/account", createAccount);
accountRouter.get("/account", getAllAccount);
accountRouter.get("/account/:id", getAccountById);
accountRouter.put("/account/:id", updateAccount);
accountRouter.delete("/account/:id", deleteAccount);

module.exports = accountRouter;
