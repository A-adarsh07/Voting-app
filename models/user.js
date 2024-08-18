const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');

// Person Schema
const userSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    aadharCardNumber: {
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true  
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    }

})

const User= mongoose.model('User',userSchema);
module.exports=User;

