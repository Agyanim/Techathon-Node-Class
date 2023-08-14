const express=require("express")
const { accountAuth } = require("../controllers/authController")

const authRoute=express.Router()

authRoute.post("/",accountAuth)


module.exports=authRoute