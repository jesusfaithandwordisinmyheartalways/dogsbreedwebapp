





import express from 'express';
import StripeControllerFunction from '../controllers/stripeController.js';
import googlePayControllerFunction from '../controllers/googlePayController.js';



const router = express.Router()
router.post('/create-payment-intent', StripeControllerFunction)
router.get('/config', googlePayControllerFunction)



export default router