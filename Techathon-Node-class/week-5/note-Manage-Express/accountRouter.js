const express=require("express")
const { createAccount } = require("./account")

const accountRouter=express.Router()
accountRouter.get("/accout",createAccount)




module.exports=router