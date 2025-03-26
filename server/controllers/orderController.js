





import dotenv from 'dotenv';
import OrderUser from '../models/orderModel.js';
import jsonWebToken from 'jsonwebtoken';



dotenv.config();

let backendOrders = [];




const UserOrder = async (req, res) => {
    const { name, email, address, phone, cart, pickupOption } = req.body;
    const orders = req.body.orders;
     console.log('Received orders:', orders);
     res.json({ message: 'Orders received' });

    try {

        
        const emailOrderExist = await OrderUser.findOne({ email });
        if (emailOrderExist) {
            return res.status(400).json({ success: false, message: 'An order with this email already exists.' });
        }

        if (!cart || cart.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart cannot be empty.' });
        }

        
        // Save order to database
        const newOrderUser = new OrderUser({
            id: backendOrders.length + 1,
            name,
            email,
            address,
            phone,
            cart,
            pickupOption,
        });

        backendOrders.push(newOrderUser);
        await newOrderUser.save();

        // Generate JWT token
        const authToken = jsonWebToken.sign({ name, address, phone,  cart, pickupOption }, process.env.JWT_SECRET, { expiresIn: '365d' }
        );

        // Set token as a secure cookie
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year expiration
        });

        res.json({ success: true, message: "Order placed successfully!", order: newOrderUser });
    } catch (error) {
        console.error("Order Submission Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




export default UserOrder;