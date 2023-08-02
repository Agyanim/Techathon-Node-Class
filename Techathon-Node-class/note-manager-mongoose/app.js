const express = require("express");
const mongoose = require("mongoose");
// const { userRouter, authRouter } = require("./router");//for mongodb
const { userRouter, authRouter, noteRouter } = require("./pgRouter");//for posgres db
const { pgClient } = require("./util/pgConnection");
dotenv = require("dotenv").config();
mongoose.set("strictQuery", false);
const PORT = process.env.PORT;


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use([userRouter, authRouter,noteRouter]);

const start = async () => {
	try {
		// mongodb connection string
		// mongoose.connect(process.env.CONNECTION);
		// postgres connection string
		await pgClient.connect();
		app.listen(PORT, () => {
			console.log(`Server is started and listening on port ${PORT}...`);
		});
	} catch (error) {
		console.log(error.message);
	}
};

start();
