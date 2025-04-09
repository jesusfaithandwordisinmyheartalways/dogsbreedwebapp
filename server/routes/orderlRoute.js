







import express from 'express';
import UserOrder from '../controllers/orderController.js'
import fetchOrders from '../controllers/fetchOrders.js';
import userAuthentication from '../middleware/userAuth.js';
import purchaseAuthentication from '../middleware/purchaseAuth.js';
import updateAddress from '../controllers/updateAddress.js';
import deleteAddress from '../controllers/deleteAddress.js';
import getSavedAddresses from '../controllers/getSavedAddresses .js';



const router = express.Router()


router.get('/user-orders', userAuthentication, purchaseAuthentication, fetchOrders )
router.get('/purchase',userAuthentication, getSavedAddresses)
router.post('/purchase',  userAuthentication, UserOrder)
router.put('/purchase', userAuthentication, updateAddress )  
router.delete('/purchase/:addressId', userAuthentication, deleteAddress )  



export default router;