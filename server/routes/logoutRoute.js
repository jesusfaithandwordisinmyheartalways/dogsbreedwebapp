



import express from 'express';
import UserLogoutFunction from '../controllers/logoutController.js';

const router = express.Router()

router.post('/logout', UserLogoutFunction, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error while logging out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'Logged out successfully' });
    });
})


export default router;