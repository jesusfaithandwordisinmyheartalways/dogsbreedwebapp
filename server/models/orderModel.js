





import mongoose from 'mongoose'



const userOrderSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 }, // Full name
    email: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Please enter a valid email address."
        }
    },
    address: {
        street: { type: String, required: true, minlength: 3 },
        city: { type: String, required: true, minlength: 3 },
        state: { 
            type: String, 
            required: true, 
            match: /^[A-Z]{2}$/, 
            message: "Please enter a valid State abbreviation."
        },
        zipcode: { 
            type: String, 
            required: true, 
            match: /^\d{5}$/, 
            message: "Please enter a valid ZIP code."
        },
        country: { 
            type: String, 
            required: true, 
            match: /^[A-Za-z ]+$/, 
            message: "Please enter a valid country name."
        }
    },
    phone: { 
        type: String, 
        required: true, 
        match: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 
        message: "Please enter a valid phone number."
    },
    cart: [
        {
            id: String,
            name: String,
            image: String,
            size: String,
            pickupOption: String,
            quantity: Number
        }
    ],
    
    pickupOption: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
      

})



const OrderUser = mongoose.model('orders', userOrderSchema, 'orders')
export default OrderUser