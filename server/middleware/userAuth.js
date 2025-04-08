



import jwt from 'jsonwebtoken';
import RegisterUser from '../models/registerModel.js'




const userAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if(!token) {
             return res.status(401).json({ authenticated: false })
        }
        
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          const user = await RegisterUser.findById(decoded.id);
          if (!user) {
            return res.status(401).json({ authenticated: false });
        }

        req.user = user; // Store user data in request         
        next(); // Proceed to the next middleware, should not send response here


    }catch(error) {
        console.error("Token verification failed:", error);
       return res.status(403).json({ authenticated: false });

    }


}



export default userAuthentication