



import UserPostReview from "../models/reviewModel.js";


const fetchReviews = async (req, res) => {
    try {
        const reviews = await UserPostReview.find({})
        res.status(200).json({ reviews })
    }catch(error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Failed to fetch reviews" });

    }
}


export default fetchReviews