


import express from 'express';
import UserRegisterFunction from '../controllers/registerController.js';


const router = express.Router()
router.post('/register', UserRegisterFunction, (req, res) => {
    console.log("Received Registration Data:", req.body); //Backend Debugging  Log every request body to verify the expected data
})

export default router;