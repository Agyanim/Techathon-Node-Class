const mongoose=require("mongoose")

const accountSchema=mongoose.Schema({
    userId: String,
      firstName: String,
      lastName: String,
      password: String,
      email: String,
      createdOn: Date,
      modifiedOn: Date
})

module.exports=mongoose.model("AccountModel",accountSchema)