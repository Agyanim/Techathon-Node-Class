const express = require("express");
const accountRouter = require("./accountRouter");
const noteRouter = require("./noteRouter");
const mongoose = require("mongoose");
dotenv = require("dotenv").config();

const Port = process.env.PORT || 3000;
mongoose.set("strictQuery", false);
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/account", accountRouter);
app.use("/note", noteRouter);
app.get("/", (req, res) => {
	res.send("Home");
});

const start = async () => {
	try {
        mongoose.connect(process.env.CONNECTION);
	app.listen(Port, () => {
		console.log(`Server started and listening at port ${Port}...`);
	});
    } catch (error) {
        console.log(error.message);
    }
};
start();
