import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
dotenv.config()

// hashing password
const password="password"
const salt= bcryptjs.genSaltSync(10)
const hash=bcryptjs.hashSync(password,salt)
// console.log(hash);
// checking original password with the hash password
const result=bcryptjs.compareSync("password",hash)
// console.log(result);


// Authentication with jwt(Jsonwebtoken)

// Generation jwt token
const payload={
    userName:"Samuel",
    password:"password"
}
const secret=process.env.JWT_SECRET
// Synchronously
const token=jwt.sign(payload,secret,{expiresIn:"30s"}) 
// Asynchronously
jwt.sign(payload,secret,{expiresIn:"60s"},(err,token)=>{
    if(err) throw Error
    // console.log(token);
})
// console.log(token);
const decode=jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImdpZGVvbiIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2OTIyNDU2NDEsImV4cCI6MTY5MjI0NTcwMX0.x_KQ75QbptbrZ3MbZZjG3zz1zg40SokL9uXMMIBC3Mo")
// console.log(decode);

jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlNhbXVlbCIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2OTIyNDc2ODksImV4cCI6MTY5MjI0Nzc0OX0.WwRuyUcFnLk_0T9dnT-75JIZsW9XXJJwUN7FzSJPwTo",secret,(err,token)=>{
    if(err){
        console.log(err.message);
    }
    else console.log(token);
})
