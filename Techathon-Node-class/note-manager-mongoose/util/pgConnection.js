const {Client}=require("pg")
dotenv=require("dotenv").config()

 const pgDbConfig={
    user:process.env.USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PG_PORT
  }
  
  exports.pgClient = new Client(pgDbConfig);
