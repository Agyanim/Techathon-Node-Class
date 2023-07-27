const express = require("express");
const {
  createAccount,
  getAllAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
} = require("./account");

const accountRouter = express.Router();

accountRouter.post("/", createAccount);
accountRouter.get("/", getAllAccount);
accountRouter.get("/:id", getAccountById);
accountRouter.put("/:id", updateAccount);
accountRouter.delete("/:id", deleteAccount);

module.exports = accountRouter;
