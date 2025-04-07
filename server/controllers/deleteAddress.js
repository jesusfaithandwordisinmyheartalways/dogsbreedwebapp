






import OrderUser from '../models/orderModel.js';
import dotenv from 'dotenv';


dotenv.config();




const deleteAddress = async (req, res) => {
    try {
        const user = req.user;
        const { addressId } = req.params;
    
        const userOrder = await OrderUser.findOneAndUpdate(
          { email: user.email },
          { $pull: { addresses: { _id: addressId } } }, // Remove address by ID
          { new: true }
        );
    
        if (!userOrder) {
          return res.status(404).json({ message: 'Address deletion failed' });
        }
    
        res.status(200).json({ addresses: userOrder.addresses });
      } catch (err) {
        res.status(500).json({ message: 'Failed to delete address', error: err.message });
      }
      
}




export default deleteAddress