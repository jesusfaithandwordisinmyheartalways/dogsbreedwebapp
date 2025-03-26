




import mongoose from 'mongoose'

//validation in a schema to prevent invalid data being saved to the database.
//  schema supports tracking failed attempts:


const loginSchema = new mongoose.Schema({

    username: {
        type:String,
        required:true,
        unique: true,
        minlength: 3,
        validator: function(response) {
            return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.text(response)
        },
        message: 'At least one uppercase letter, one special character, Minimum of eight characters'
    },

    password: {
        type:String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(value) {
                return /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },
            message: "Password must contain at least one special character."
        }
    },

    email: {
        type:String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return/\S+@\S+\.\S+/.test(value); 
            },
            message: "Please enter a valid email address."
        }
    },

    failedAttempts: {
        type: Number,
        default: 0
    },
    
    isLocked: {
        type:Boolean,
        default:false,
    },

    lockUntil: {
        type:Date,
        default:null
    }

})







const LoginUser = mongoose.model('login', loginSchema, 'login')
export default LoginUser