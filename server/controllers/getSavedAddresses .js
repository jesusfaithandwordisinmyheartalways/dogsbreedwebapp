




import RegisterUser from "../models/registerModel.js"
import OrderUser from "../models/orderModel.js";



const getSavedAddresses  = async (req, res) => {
    try {
        const user = req.user; // The authenticated user
        const userOrder = await OrderUser.findOne({ email: user.email });
    
        if (!userOrder) {
          return res.status(404).json({ message: 'No saved addresses found' });
        }
    
        res.status(200).json({ addresses: userOrder.addresses.slice(-3) }); // Send last 3 addresses
      } catch (err) {
        res.status(500).json({ message: 'Failed to fetch saved addresses', error: err.message });
      }
}


export default getSavedAddresses