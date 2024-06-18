const express = require("express");
const app=express();
const cors = require("cors");
app.use(express.json());
app.use(cors({
   origin:[""],
   methods:["POST","GET"],
   credentials:true
}));
app.get("/",(req,res)=>{
   res.json({msg:"Welcome to my API"});
})
const port=3000;
const mainRouter=require("./routes/index");
 
app.use("/api/v1",mainRouter);
app.listen(port);
console.log(`app running on port ${port}`);

  
