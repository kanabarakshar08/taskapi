const mongoose = require('mongoose');


const RegisterSchema = mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },    

    UserId:{
        type:Array,
        ref:'User'
    },
    taskid : {
        type : Array,
        ref:'Task' 
    },
    task:{
        type: String,
    },
    categary:{
        type: String,
    }
})


const registerData = mongoose.model('Register', RegisterSchema);
module.exports = registerData;