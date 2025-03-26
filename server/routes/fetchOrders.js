






import express from 'express';
import AdminRetrieveOrdersFunction from '../controllers/adminOrders.js';


const router = express.Router()

// GET route for fetching all orders (admin only)
router.get('/orders', async (req, res) => {
    try {
      const orders = await AdminRetrieveOrdersFunction();
      res.json({ orders: orders }); // Return the stored orders to the admin
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  });

export default router;