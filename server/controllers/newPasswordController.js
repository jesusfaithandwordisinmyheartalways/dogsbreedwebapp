


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import RegisterUser from '../models/registerModel.js';
import mongoose from 'mongoose';

dotenv.config();




const UserNewPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least 8 characters, including a special character' });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Verify JWT Token (Assuming user is authenticated)
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await RegisterUser.findOne({ _id: new mongoose.Types.ObjectId(decoded.id) });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if new password is the same as the current one
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return res.status(400).json({ success: false, message: "New password cannot be the same as the old password." });
        }

        // Hash the new password and update the user record
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        await user.save();

        // Generate new JWT token
        const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '365d' });

        // Store new token in HTTP-only cookie
        res.cookie('authToken', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 365 * 24 * 60 * 60 * 1000, 
            sameSite: 'Strict',
        });

        return res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (error) {
        console.error("New password update error:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};





export default UserNewPassword;