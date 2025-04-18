




import express from 'express';
import adminOrdersAuthentication from '../middleware/adminOrdersAuthentication.js';
import fetchAdminOrders from '../controllers/fetchAdminOrders.js';
import AdminRetrieveOrdersFunction from '../controllers/adminFetchOrders.js';




const router = express.Router()
router.get('/purchase', adminOrdersAuthentication, AdminRetrieveOrdersFunction, fetchAdminOrders)



export default router;
