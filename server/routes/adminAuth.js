



import express from 'express';
import adminAuthentication from '../middleware/adminAuthentication.js';


const router = express.Router()

router.get('/adminAuthentication', adminAuthentication, (req, res) => {
        if(req.session.user) {//req.session.user stores and access the authenticated user data
            return res.json({ authenticated: true, adminUser: req.session.user})
        } else {
            return res.json({ authenticated: false })
        }

    }

)


export default router