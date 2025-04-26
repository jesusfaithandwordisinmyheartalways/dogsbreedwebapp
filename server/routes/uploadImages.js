


import express from 'express';
import userAuthentication from '../middleware/userAuth';
import uploadImage from '../middleware/uploadImage/uploadImage';
import fetchImage from '../controllers/fetchImage';


const router = express.Router()
router.post('/profile', uploadImage, userAuthentication)
router.get('/images', fetchImage, userAuthentication)





export default router
