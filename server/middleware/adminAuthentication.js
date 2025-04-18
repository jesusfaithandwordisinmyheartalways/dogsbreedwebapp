



import AdminLoginUser from '../models/adminModel.js';
import jwt from 'jsonwebtoken';





const adminAuthentication = async (req, res) => {
    try {
        const adminToken = req.cookies.adminToken;
        if(!adminToken) {
            return res.status(401).json({ authenticated: false})
        }
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET) // the verify method checks if the token is valid using a secret key
        const adminUserLogin = await AdminLoginUser.findById(decoded.id)
        if(!adminUserLogin) {
            return res.status(401).json({ authenticated: false });
        }

        req.session.user = adminUserLogin 
        next()
    }catch(error) {
        console.error("Admin User Token verification failed:", error);
        return res.status(403).json({ authenticated: false });
    }
}




export default adminAuthentication