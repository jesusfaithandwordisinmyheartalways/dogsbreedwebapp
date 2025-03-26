




import mongoose from 'mongoose'


const registerSchema = new mongoose.Schema({
    name: { type: String, required: true,  minlength: 2 },
    lastName: {  type: String,required: true,  minlength: 2, },
    username: {
        type:String,
        required:true,
        minlength:3,
        validate: {
             validator: function(response) {
            return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(response);
          },
        message: 'At least one uppercase letter, one special character, and a minimum of eight characters required'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (response) {
                return /[!@#$%^&*(),.?":{}|<>]/.test(response);
            },
            message: 'Password must contain at least one special character & eight characters'
        }
    },

    email: {
        type: String,
        required: true,
        validate: {
            validator: function(response) {
                return /\S+@\S+\.\S+/.test(response);
            },
             message: "Please enter a valid email address."
        }
    }

})





const RegisterUser = mongoose.model('register', registerSchema, 'register')
export default RegisterUser