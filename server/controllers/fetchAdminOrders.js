




import OrderUser from "../models/orderModel.js";

// add code to fetchorders to be displayewd in the admin panel dashboard component on the Client side

const fetchAdminOrders = async (req, res) => {
    try {
        const purchaseToken = req.cookies.purchaseToken;
    
        if (!purchaseToken) {
          return res.status(401).json({ success: false, message: 'Purchase token missing.' });
        }
    
        const orders = await OrderUser.find(); // get all orders
    
        if (!orders || orders.length === 0) {
          return res.status(404).json({ success: false, message: 'No orders found.' });
        }
    
        res.status(200).json({ success: true, orders }); // send all orders
      } catch (error) {
        console.error('Error fetching admin orders:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching admin orders.' });
      }
}




export default fetchAdminOrders