const express=require("express")
const { lendMoney, getAllLends } = require("../controllers/lendController")
const lendRoute=express.Router()


lendRoute.route("/").post(lendMoney).get(getAllLends)


module.exports=lendRoute