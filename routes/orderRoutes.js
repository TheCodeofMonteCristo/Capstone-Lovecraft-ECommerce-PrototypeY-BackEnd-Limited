// orderRoutes.js
// This file contains routes for managing orders: creation, retrieval, etc.

const express = require('express');
const {
  createOrder,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus
} = require('../controllers/orderController');
const router = express.Router();

// POST /orders - Route for creating a new order
router.post('/', createOrder);

// GET /orders/:id - Route for fetching an order by ID
router.get('/:id', getOrderById);

// GET /orders/user/:userId - Route for fetching orders by a specific user
router.get('/user/:userId', getOrdersByUser);

// PUT /orders/:id/status - Route for updating the order status (e.g., 'shipped', 'pending')
router.put('/:id/status', updateOrderStatus);

module.exports = router;
