







import express from 'express';
import UserPostReviewFunction from '../controllers/reviewsController.js'
import fetchReviews from '../controllers/fetchReview.js';


const router = express.Router()
router.post('/user-reviews', UserPostReviewFunction)
router.get('/user-reviews', fetchReviews)

export default router