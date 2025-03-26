




import express from 'express';
import UserLoginFunction from '../controllers/loginController.js';


const router = express.Router()
router.post('/login', UserLoginFunction, (req, res) => {
    const { loginUsername, loginPassword, loginEmail } = req.body;

    // Check user credentials here (replace with actual logic)
    if (loginUsername === 'user' && loginPassword === 'password') {
        req.session.user = { username: loginUsername, email: loginEmail }; // Store user info in session
        return res.json({ success: true, message: "Logged in successfully", user: req.session.user });
    } else {
        return res.json({ success: false, message: "Invalid credentials" });
    }
    
})



export default router;