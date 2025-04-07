





import mongoose from 'mongoose';

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

  addresses: [
    {
      _id: false, // if you don’t want MongoDB to auto-create an ID for each address
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
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
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { 
        type: String, 
        required: true, 
        match: [/^\d{5}$/, "Please enter a valid ZIP code."]
      },
      country: { 
        type: String, 
        required: true, 
        match: [/^[A-Za-z ]+$/, "Please enter a valid country name."]
      },
      phone: { 
        type: String, 
        required: true, 
        match: [/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Please enter a valid phone number."]
      }
    }
  ],

  defaultAddressIndex: {
    type: Number,
    default: 0
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
});

const OrderUser = mongoose.model('orders', userOrderSchema, 'orders');
export default OrderUser;