const express =require("express");
const accountRouter = require("./accountRouter");
const app=express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(accountRouter)
app.get("/",(req,res)=>{
    res.send("Home")
})

app.listen(3000,()=>{
    console.log("Server started and listening at port 3000...");
})