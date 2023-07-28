const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./router");
dotenv = require("dotenv").config();
mongoose.set("strictQuery", false);
const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userRouter);

const start = async () => {
  try {
    mongoose.connect(process.env.CONNECTION);
    app.listen(PORT, () => {
      console.log(`Server is started and listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
