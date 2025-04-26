

import dotenv from 'dotenv';

import uploadImage from "../middleware/uploadImage/uploadImage.js"
import cookie from 'cookie';




const fetchImage = async (req, res) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const profileImageUrl = cookies.profileImage;

        if (!profileImageUrl) {
            return res.status(404).json({ error: 'Profile image not found' });
        }

        res.json({ url: profileImageUrl });
    } catch (error) {
        console.error('Fetch Image Error:', error);
        res.status(500).json({ error: 'Failed to fetch image' });
    }
    

}


export default fetchImage