



import jwt from 'jsonwebtoken';




const adminOrdersAuthentication = (req, res, next) => {
    try {
        const token = req.cookies.adminOrdersToken;
        if (!token) {
            return res.status(401).json({ message: 'admin orders token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'not authorized as admin' });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error('Admin order auth error:', error);
        return res.status(403).json({ message: 'admin not found' });
    }
};





export default adminOrdersAuthentication