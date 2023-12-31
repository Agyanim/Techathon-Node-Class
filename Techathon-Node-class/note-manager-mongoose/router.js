const express = require("express");
const {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("./controller/mongodb/user");
const { auth } = require("./controller/mongodb/auth");
const userRouter = express.Router();
const authRouter = express.Router();
const noteRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);
authRouter.post("/auth", auth);

module.exports = { userRouter,authRouter };
