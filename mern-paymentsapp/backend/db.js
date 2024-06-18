const mongoose=require("mongoose");
const { required } = require("./zod/types");
const { type } = require("os");
const { number } = require("zod");
mongoose.connect("mongodb+srv://navis12ns:82UIWvjG4egWGYeP@cluster0.u5l2cmk.mongodb.net/paytm");
const userSchema=mongoose.Schema({
    username:String,
    password:String, 
    firstName:String,
    lastName:String,
})

// const accountSchema=mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'user',
//         required:true
//     },
//     balance:{
//         type:Number,
//         required:true
//     }
// })

const transactionSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        default: function() {
            const now = new Date();
            return now.toISOString().split('T')[0]; // YYYY-MM-DD
        }
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        default: function() {
            return new Date().toLocaleTimeString();
        }
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    history: [transactionSchema]
});

const user=mongoose.model("user",userSchema);
const account=mongoose.model("account",accountSchema);
module.exports={user,account};