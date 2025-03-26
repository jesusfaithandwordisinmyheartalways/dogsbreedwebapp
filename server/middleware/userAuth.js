



import jwt from 'jsonwebtoken';
import RegisterUser from '../models/registerModel.js'
import mongoose from 'mongoose';




const userAuthentication = async (req, res, next) => {
        const token = req.cookies.authToken;
        if(!token) {
             return res.status(401).json({ authenticated: false })
        }
        
    try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
           // Fix: Convert string to ObjectId
          const user = await RegisterUser.findOne({  _id: new mongoose.Types.ObjectId(decoded.id) });         
          res.json({ authenticated: true, user: { name: user.name , firstName: user.firstName }})
    }catch(error) {
        console.error("Token verification failed:", error);
       return res.status(403).json({ authenticated: false });

    }


}



export default userAuthentication