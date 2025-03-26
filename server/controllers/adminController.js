




import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import AdminLoginUser from '../models/adminModel.js';



dotenv.config();





const UserAdminLoginFunction = async (req, res) => {
    const { adminUsername, adminPassword, adminEmail } = req.body;

    try {
        // Check if the admin already exists by username or email
        const existingAdmin = await AdminLoginUser.findOne({ $or: [{ adminUsername }, { adminEmail }],});
    
        if (existingAdmin) {
          // If the admin exists, compare passwords for login
          const isPasswordValid = await bcrypt.compare(adminPassword, existingAdmin.adminPassword);
          if (isPasswordValid) {

            // If credentials are valid, generate and send the JWT token
            const token = jwt.sign({ id: existingAdmin._id, adminUsername: existingAdmin.adminUsername }, process.env.JWT_SECRET,{ expiresIn: '1h' } );
    
            // Set the token in a secure, HTTP-only cookie
            res.cookie('adminToken', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 3600000, // 1 hour
            });
    
            return res.status(200).json({
              success: true,
              message: 'Admin logged in successfully',
            });
          } else {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
          }
        } else {
          // Admin doesn't exist, create a new admin account
    


          // Hash the password before saving
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
          const newAdmin = new AdminLoginUser({
            adminUsername,
            adminPassword: hashedPassword,
            adminEmail,
          });
    
          await newAdmin.save();
    

          // Generate JWT token
          const token = jwt.sign( { id: newAdmin._id, adminUsername: newAdmin.adminUsername }, process.env.JWT_SECRET, { expiresIn: '1h' } );
    

          // Set the token in a secure, HTTP-only cookie
          res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
          });
    

          return res.status(200).json({success: true, message: 'Admin registered and logged in successfully',});
        }
      } catch (error) {
        console.error('Admin login/registration error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
      }

}




export default UserAdminLoginFunction