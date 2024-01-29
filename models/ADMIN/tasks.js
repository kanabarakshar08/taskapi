const mongoose = require('mongoose');

const multer = require('multer')

const taskschems = mongoose.Schema({
    taskname : {
        type : String 
    },
    tasktype : {
        type : String 
    },
    date : {
        type : String 
    },
    tasks : {
        type : String 
    },
    userids : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    adminid:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Register' ,
        required : true
    },
    status:{
        type : String
    }
})



const task = mongoose.model('Task',taskschems);

module.exports = task;  