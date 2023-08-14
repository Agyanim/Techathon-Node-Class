const express = require("express");
const { dbConnection } = require("./connections/dbConnection");
const accountRoute = require("./route/accountRoute");
const lendRoute = require("./route/lendRoute");
const authRoute = require("./route/authRoute");
const cors=require("cors")
dotenv = require("dotenv").config();

const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;
const app = express();
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Rent Money page.")
})
app.use("/account",accountRoute)
app.use("/lend",lendRoute)
app.use("/auth",authRoute)
app.listen(PORT, async() => {
	await dbConnection(URL);
	console.log(`Server connected at http://127.0.0.1:${PORT}...`);
});
