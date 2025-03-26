


import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import UserPostReview from '../models/reviewModel.js'




dotenv.config()



const UserPostReviewFunction = async(req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging log
        const { title, review, username, email, rating } = req.body;

        if (!title || !review || !username || !email || !rating) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }


        const reviewEmail = await UserPostReview.findOne({ email })
        if (reviewEmail) {
            return res.status(400).json({ message: "You have already submitted a review." });
        }

        const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: "365d" });

        const newReview = new UserPostReview({ title,  review, username, email, rating });
        await newReview.save();


        res.cookie("csrfToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 365 * 24 * 60 * 60 * 1000 
        });
        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    }catch(error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });

}

 
}





export default UserPostReviewFunction 