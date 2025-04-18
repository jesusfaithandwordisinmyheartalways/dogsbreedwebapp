







import express from 'express';
import UserOrder from '../controllers/orderController.js'
import fetchOrders from '../controllers/fetchOrders.js';
import userAuthentication from '../middleware/userAuth.js';
import purchaseAuthentication from '../middleware/purchaseAuth.js';



const router = express.Router()


router.get('/user-orders', userAuthentication, purchaseAuthentication, fetchOrders )
router.post('/purchase',  userAuthentication, UserOrder)



export default router;