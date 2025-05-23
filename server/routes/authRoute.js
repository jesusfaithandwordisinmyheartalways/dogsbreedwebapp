



import express from 'express';
import userAuthentication from '../middleware/userAuth.js'

const router = express.Router()

router.get('/authentication', userAuthentication, (req, res) => {
    if (req.session.user) {// req.session.user stores and access the authenticated user data
        return res.json({ authenticated: true, user: req.session.user });
    } else {
        return res.json({ authenticated: false });
    }
})

export default router;