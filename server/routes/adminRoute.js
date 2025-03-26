




import express from 'express';
import UserAdminLoginFunction from '../controllers/adminController.js';



const router = express.Router()
router.post('/admin-login', UserAdminLoginFunction,)

export default router