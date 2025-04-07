


import dotenv from 'dotenv';
import UserPostReview from '../models/reviewModel.js'




dotenv.config()

const UserPostReviewFunction = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { title, review, username, email, rating } = req.body;

        if (!title || !review || !username || !email || !rating) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Prevent duplicate reviews from the same email
        const existingReview = await UserPostReview.findOne({ email });
        if (existingReview) {
            return res.status(400).json({ message: "You have already submitted a review." });
        }

        // Save to database
        const newReview = new UserPostReview({ title, review, username, email, rating });
        await newReview.save();

        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (error) {
        console.error("Error in saving review:", error);
        res.status(500).json({ message: "Server error, unable to submit review." });
    }
};

export default UserPostReviewFunction 