const express = require("express");
const {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("./controller/postgres/user");
const { auth } = require("./controller/postgres/auth");
const { createNote, getAllNote } = require("./controller/postgres/note");
const userRouter = express.Router();
const authRouter = express.Router();
const noteRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);
authRouter.post("/auth", auth);
noteRouter.post("/note", createNote);
noteRouter.get("/note", getAllNote);

module.exports = { userRouter,authRouter,noteRouter };
