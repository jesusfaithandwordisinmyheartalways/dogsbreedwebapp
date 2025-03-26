





import mongoose from 'mongoose'





const reviewSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    review: { type: String, required: true, minlength: 3 },


    username: {
        type: String,
        required: true,
        minlength: 3,
        validate: {
            validator: function (value) {
                return /^[A-Za-z]+$/.test(value);
            },
            message: 'Username must contain only letters.',
        }
    },

    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: "Please enter a valid email address."
        }
    },


    rating: { 
        type: Number, 
        required: true, 
        min: 1,
         max: 5 }

});






const UserPostReview = mongoose.model('reviews', reviewSchema, 'reviews')
export default UserPostReview