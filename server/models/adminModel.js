





import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    adminUsername: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        validate: {
            validator: function(value) {
                return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value);
            },
            message: 'At least one uppercase letter, one special character, and minimum of eight characters required.',
        },
    },

    adminPassword: {  // Fixed typo from "adminPassowrd" to "adminPassword"
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(value) {
                return /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },
            message: "Password must contain at least one special character."
        }
    },

    adminEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: "Please enter a valid email address."
        }
    },
});



const AdminLoginUser = mongoose.model('admin', adminSchema, 'admin');
export default AdminLoginUser;