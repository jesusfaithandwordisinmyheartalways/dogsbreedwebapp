

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import RegisterUser from '../models/registerModel.js';




dotenv.config();

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes



const UserLoginFunction = async (req, res) => {
    try {
        const { loginUsername, loginPassword, loginEmail } = req.body;

        const user = await RegisterUser.findOne({ $or : [{ username: loginUsername }, { email: loginEmail }] });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const userPasswordMatch = await bcrypt.compare(loginPassword, user.password);
        if (!userPasswordMatch) {
            console.log("Password mismatch for:", loginUsername);  // Add logging for debugging
            await trackFailedUserAttempts(user)
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

         // Check if the entered password matches any stored password in the database
         const users = await RegisterUser.find(); // Get all users
         for (const existingUser of users) {
             const match = await bcrypt.compare(loginPassword, existingUser.password);
             if (match && existingUser._id.toString() !== user._id.toString()) {
                 return res.status(400).json({ success: false, message: "This password is already used by another user." });
             }
         }

         // Check if user is locked
         if (user.isLocked && user.lockUntil > Date.now()) {
            return res.status(403).json({ success: false, message: "Account locked. Try again later." });
        }

         // Check if password exists in the user object
         if (!user.password) {
            return res.status(400).json({ success: false, message: "Password is missing." });
        }

          // Reset failed attempts on successful login
          user.failedAttempts = 0;
          user.isLocked = false;
          user.lockUntil = null;
          await user.save();

          //store jwt token
        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '365d' });

        // Set token in HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // This will only work if you're in production mode (https)
            maxAge: 365 * 24 * 60 * 60 * 1000,  // 30 days
            sameSite: 'Strict',
        });


        console.log("User Email:", loginEmail);
        console.log("Entered Password:", loginPassword);
        console.log("Stored Hashed Password:", user.password);
        return res.status(200).json({ success: true, message: 'Login successful', user, token });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }

}









// function to track failed attempts
const trackFailedUserAttempts = async  (user) => {
    user.failedAttempts += 1;

    if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        user.isLocked = true;
        user.lockUntil = Date.now() + LOCK_TIME;
    }

    await user.save();
}






export default UserLoginFunction