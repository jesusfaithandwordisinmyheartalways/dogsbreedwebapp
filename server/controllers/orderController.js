





import dotenv from 'dotenv';
import OrderUser from '../models/orderModel.js';
import jsonWebToken from 'jsonwebtoken';



dotenv.config();

let backendOrders = [];


const UserOrder = async (req, res) => {
    try {
        const { name, email, address, phone, cart, pickupOption } = req.body;
        console.log('Received cart:', cart); // Corrected key name

          // add code to make sure the OrderUser properties are valid based on the  OrderUser  Schema 
        if (!cart || cart.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart cannot be empty.' });
        }

        // Save order to database
        const newOrderUser = new OrderUser({
            userId:req.user._id, // Store the user ID from the authenticated user
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
       
        res.status(200).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error("Order Submission Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};




export default UserOrder;