const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("./user");
const userRouter = express.Router();
const noteRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);

module.exports = { userRouter };
