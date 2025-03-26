


import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import RegisterUser from '../models/registerModel.js';


dotenv.config()




const UserRegisterFunction = async (req, res) => {
    try {
        const { name, lastName, username, password, email } = req.body;
        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        const usernameRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        const emailRegex = /\S+@\S+\.\S+/;
     
        if (!nameRegex.test(name)) {
            return res.status(400).json({ success: false, message: 'Invalid name' });
        }
    
        if(!usernameRegex.test(username)) {
            return res.status(400).json({ success: false, message: 'At least one uppercase letter, one special character, Minim of 8 characters' });
        }
    
    
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must contain at least 8 characters, including a special character' });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
    
    
        // NEW: Check if the password contains the name or last name
        if (password.toLowerCase().includes(name.toLowerCase())  || password.toLowerCase().includes(lastName.toLowerCase())) {
            return res.status(400).json({ success: false, message: 'Password cannot contain your first or last name' });
        }
    
        if (!name || !lastName || !username || !password || !email) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }



        console.log("Incoming registration data:", req.body); // Debugggin 
        const userExist = await RegisterUser.findOne({ $or: [{ username } , { email }] });
        if (userExist) {
            return res.status(400).json({ success: false, message: 'Username or Email already exists' });
        }
 
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);  // Hashing password
        const newUser = new RegisterUser({ name, lastName, username, email, password: hashedPassword });
        await newUser.save();
 
        return res.status(201).json({ success: true, message: 'User Registration successful' });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
 }
 
 
 
 
 
 

 
 
 export default UserRegisterFunction


