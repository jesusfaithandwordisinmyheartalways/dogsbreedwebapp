


import OrderUser from '../models/orderModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config();




const updateAddress = async (req, res) => {
    try {
        const user = req.user; // The authenticated user
        const { address } = req.body; // Updated address data
        const userOrder = await OrderUser.findOneAndUpdate(
          { email: user.email },
          { $set: { 'addresses.$[elem]': address } },
          { arrayFilters: [{ 'elem._id': address._id }] } // Update the correct address by ID
        );
    
        if (!userOrder) {
          return res.status(404).json({ message: 'User not found or address update failed' });
        }
    
        res.status(200).json({ addresses: userOrder.addresses });
      } catch (err) {
        res.status(500).json({ message: 'Failed to update address', error: err.message });
      }
      
}




export default  updateAddress