const { authService } = require("../services/authService")

exports.accountAuth=async(req,res)=>{
try {
    const {accountName,accountNumber}=req.body
    if(! accountName || ! accountNumber){
        return res.status(400).json("All field must be provided")
    }
    const findAccount= await authService(accountNumber)
    if(! findAccount){
        return res.status(401).json("Sorry, no account found")
    }
if((findAccount.name!==accountName)){
return res.status(401).json("Sorry, account name provided does not match with that of the account. Do provide the correct account name to proceed")
}
res.status(200).json({message: "Success",findAccount})
} catch (error) {
    res.status(500).json(error.message)
}
}