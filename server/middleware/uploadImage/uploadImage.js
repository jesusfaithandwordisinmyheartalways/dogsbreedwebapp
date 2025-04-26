

import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import cookie from 'cookie';




dotenv.config();


cloudinary.config({
     cloud_name:process.env.CLOUDINARY_API_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret:process.env.CLOUDINARY_API_SECRET_KEY
})


// Multer setup to grab file
const storage = multer.memoryStorage()
const upload = multer({ storage })



const uploadImage = async () => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Multer Error:', err);
            return res.status(400).json({ error: 'File upload error' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        try {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(req.file.buffer);
            });

            // Set cookie with the uploaded image URL
            res.setHeader('Set-Cookie', cookie.serialize('profileImage', result.secure_url, {
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 30, 
                path: '/',
            }));

            res.json({ url: result.secure_url });

        } catch (error) {
            console.error('Cloudinary Upload Error:', error);
            res.status(500).json({ error: 'Cloudinary upload failed' });
        }
    });

    

}





export default uploadImage