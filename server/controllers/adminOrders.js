




import OrderUser from '../models/orderModel.js';


const AdminRetrieveOrdersFunction = async (req, res) => { 
    try {
        const orders = await OrderUser.find();  // Fetch all orders from the database
        return orders;
      } catch (error) {
        console.error("Error retrieving orders:", error);
        throw new Error('Failed to fetch orders');
      }
}


export default AdminRetrieveOrdersFunction