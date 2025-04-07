



import jwt from 'jsonwebtoken';
import RegisterUser from '../models/registerModel.js'
import mongoose from 'mongoose';




const userAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if(!token) {
             return res.status(401).json({ authenticated: false })
        }
        
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          const user = await RegisterUser.findOne({  _id: new mongoose.Types.ObjectId(decoded.id) });

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