







import express from 'express';
import UserPostReviewFunction from '../controllers/reviewsController.js'



const router = express.Router()
router.post('/user-reviews', UserPostReviewFunction)

export default router