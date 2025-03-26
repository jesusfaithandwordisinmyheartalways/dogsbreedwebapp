







import express from 'express';
import UserOrder from '../controllers/orderController.js';


const router = express.Router()
router.post('/purchase', UserOrder)
export default router;