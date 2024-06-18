const express=require("express"); 
const router=express.Router();
const { account } = require("../db"); 
const {user}= require("../db")
const { authMiddleware } = require("../middlewares/middleware");


const mongoose=require("mongoose"); 

router.get("/balance",authMiddleware,async  (req,res)=>{
      const uid=req.userId;
      const acc= await account.findOne({userId:uid});
      const User=await user.findOne({_id:uid});
      const balance=acc.balance;
      res.json({     
        balance:balance,
        name:User.firstName,
        success:true
      })
 

 })

 router.get("/history",authMiddleware,async (req,res)=>{
    try{
        const uid=req.userId;
        const acc= await account.findOne({userId:uid});
        const a=acc.history;
        const history=a.reverse();
   
        res.json({history:history});
    }
    catch(err){
        console.log(err);
    }
     

 })

 router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      const now = new Date(); 
      const { to, amount } = req.body;
     
      // Find sender's account and validate balance
      const senderAccount = await account.findOne({ userId: req.userId }).session(session);
      if (!senderAccount || senderAccount.balance < amount) {
        await session.abortTransaction();
        return res.json({ msg: "Insufficient balance or invalid account" ,success:true,senderBalance:senderAccount.balance});
      }
  
      // Find recipient's account
      const recipientAccount = await account.findOne({ userId: to }).session(session);
     
      if (!recipientAccount) {
        await session.abortTransaction(); 
        return res.json({ msg: "Invalid recipient account" });
      }
  
      // Update sender's balance (deduct amount)
      await account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  
      // Update recipient's balance (add amount)
      await account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
      
      const toUser=await user.findOne({_id:to}).session(session)
      const fromUser=await user.findOne({_id:req.userId}).session(session)
      console.log(fromUser.firstName);
      const formattedDate = now.toISOString().split('T')[0];
     const transaction={
        date: formattedDate,
     amount:amount,
    description:"Sent to "+toUser.firstName,
    time: new Date().toLocaleTimeString()
  }
     const transaction2={
        date: formattedDate,
    amount:amount,
    description:"Received from "+fromUser.firstName,
    time: new Date().toLocaleTimeString()
  }
  await account.updateOne({ userId: req.userId},{ $push: { history: transaction }}).session(session)
  await account.updateOne({userId:to},{ $push: { history: transaction2 }}).session(session)
      // Commit the transaction 
      await session.commitTransaction();
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedSenderAccount = await account.findOne({ userId: req.userId });
      const updatedRecipientAccount = await account.findOne({ userId: to });
     
  // Respond with success message and updated balances
  res.json({
    msg: "Transfer successful",
    senderBalance: updatedSenderAccount.balance,
    recipientBalance: updatedRecipientAccount.balance, 
    success:true, 
    transaction,
    transaction2
  });
  
    } catch (error) {
      // If an error occurs, abort the transaction
      await session.abortTransaction();
      console.error("Error during transaction:", error);
      res.status(500).json({ msg: "Transaction failed" });
    } finally {
      // Finally, end the session
      session.endSession(); 
    }
  });


  module.exports=router;