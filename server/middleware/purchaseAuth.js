



import jwt from 'jsonwebtoken';

const purchaseAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.purchaseToken;

        if (!token) {
            return res.status(401).json({ hasOrder: false, message: 'No purchase token found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // You can optionally attach this to req if you need it later
        req.orderDetails = decoded;

        next();
    } catch (error) {
        console.error("Purchase token verification failed:", error);
        return res.status(403).json({ hasOrder: false, message: 'Invalid or expired purchase token' });
    }
};

export default purchaseAuthentication;