const express=require("express");
const zod=require("zod");
const {JWT_SECRET}  = require("../config");

const jwt=require("jsonwebtoken");
const userSchema=require("../zod/types")
const {user}  = require("../db");
const {account } = require("../db");
const {authMiddleware}=require("../middlewares/middleware")


const router=express.Router() ;


router.post("/signup",async (req,res)=>{
    const userInfo=req.body;
    const parsedBody=userSchema.safeParse(userInfo);
    if(parsedBody.success)
        { 
            const userExist=await user.findOne({username:userInfo.username});
            if(userExist){
                return res.json({
                    msg: "Email already taken" 
                })
                
            }
            const User=await user.create({
                username:parsedBody.data.username,
                firstName:parsedBody.data.firstName,
               lastName:parsedBody.data.lastName,
                password:parsedBody.data.password
            })
            const newwacc=await account.create({
                userId:User._id,
                balance:1+parseInt(Math.random()*1000),
            })
            const uid=User._id;
            const token=jwt.sign({ 
                uid
            },JWT_SECRET)
            res.json({
                msg: "User created successfully",
                token: token,
                balance:newwacc.balance,
                success:true
 

            })
            
        }
            

})

const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

router.post("/signin",async(req,res)=>{
    const {username,password}=req.body;
    const userExist=await user.findOne({username,password});
    if(userExist){
        const uid=userExist._id;
        const token=jwt.sign({ 
            uid
        },JWT_SECRET)
        res.json({
            msg:"logged in succesfully",
            success:true,
            token:token
        })
    }
    else{
        res.json({
            msg:"invalid credentials",
            success:false
        })
    }
   
})

router.put("/",authMiddleware,async (req,res)=>{
   
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await user.updateOne({_id:req.userId},req.body);
    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk",authMiddleware,async (req,res)=>{
   
    const filter = req.query.filter || "";
    console.log(filter);

try {
    const users = await user.find({
        $and: [
            {
                $or: [
                    { firstName: { $regex: filter, $options: 'i' } }, // Case-insensitive
                    { lastName: { $regex: filter, $options: 'i' } }
                ]
            },
            { _id: { $ne: req.userId } } // Exclude current user
        ]
    }).exec();

 
    ;
    res.json({  
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName, 
            lastName: user.lastName,
            _id: user._id  
        }))
    }) 
    // Handle the users data as needed
} catch (err) {
    res.json({
        msg:err
    })
    // Handle the error gracefully  
}

    
})


module.exports=router