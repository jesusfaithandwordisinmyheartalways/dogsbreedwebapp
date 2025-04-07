







import OrderUser from "../models/orderModel.js";
import RegisterUser from "../models/registerModel.js";
import jwt from 'jsonwebtoken'




const fetchOrders = async (req, res) => {
    try {
        const orders = await OrderUser.find({ userId: req.user._id });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }

}


export default fetchOrders 