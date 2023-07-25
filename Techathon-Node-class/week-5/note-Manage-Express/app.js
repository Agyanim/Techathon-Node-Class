const express =require("express");
const accountRouter = require("./accountRouter");
const app=express()


app.use(accountRouter)
app.get("/:id",(req,res)=>{
    console.log(req);
})

app.listen(3000,()=>{
    console.log("Server started and listening at port 3000...");
})