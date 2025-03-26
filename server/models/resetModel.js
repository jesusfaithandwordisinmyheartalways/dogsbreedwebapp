

import mongoose from 'mongoose'



const resetSchema = new mongoose.Schema({
    number: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    resetCode: {
        type:String,
        required:true
    },
    expireDate: {
        type:Date,
        required:true
    },
    used: {
        type:Boolean,
        default:false
    }

})




const ForgotPasswordUser = mongoose.model('reset', resetSchema, 'reset')
export default ForgotPasswordUser