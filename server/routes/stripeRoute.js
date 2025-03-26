





import express from 'express';
import StripeControllerFunction from '../controllers/stripeController.js';


const router = express.Router()
router.post('/create-payment-intent', StripeControllerFunction)
export default router