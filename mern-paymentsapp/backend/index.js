const express = require("express");
const app=express();
const cors = require("cors");
const helmet = require('helmet');
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
   res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' blob:;");
   next();
 });
app.use(cors({
   origin:["https://paymentapp-three.vercel.app"],
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

  
