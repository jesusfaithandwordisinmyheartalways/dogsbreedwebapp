


import express from 'express';
import userAuthentication from '../middleware/userAuth.js';
import uploadImage from '../middleware/uploadImage/uploadImage.js';
import fetchImage from '../controllers/fetchImage.js';


const router = express.Router()
router.post('/profile', userAuthentication, ...uploadImage)
router.get('/images', userAuthentication,  fetchImage )





export default router
