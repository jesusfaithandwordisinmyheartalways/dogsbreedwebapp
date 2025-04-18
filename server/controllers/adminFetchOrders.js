




import OrderUser from '../models/orderModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';


dotenv.config()




const AdminRetrieveOrdersFunction = async (req, res) => { 
    try {
        const orders = await OrderUser.find();  // Fetch all orders from the database
        if (!orders || orders.length === 0) {
          return res.status(404).json({ success: false, message: 'No orders found.' });
        }

        const AllOrdersToken = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '30d',});
        

        res.cookie('adminOrdersToken', AllOrdersToken, {
          httpOnly: true,
          secure: true,
          maxAge: 365 * 24 * 60 * 60 * 1000,  // 30 days
          sameSite: 'Strict',
        })

        res.status(200).json({ success: true, orders }); // ← send orders

      } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
      }
}


export default AdminRetrieveOrdersFunction