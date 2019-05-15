const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        //다른 모델에 대한 reference를 제공
        ref:'User'
    }
},{timestamps:true})


const Task =mongoose.model('Task',taskSchema)

module.exports = Task