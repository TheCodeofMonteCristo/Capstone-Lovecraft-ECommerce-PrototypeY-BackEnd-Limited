// orderController.js
// This file handles the creation, retrieval, and status updates of orders.

const { prisma } = require('../config/db'); // Prisma Client to interact with the database

// Create a new order
async function createOrder(req, res) {
  try {
    const { userId, cityId, quantity, totalPrice } = req.body;

    // Create a new order in the database
    const newOrder = await prisma.order.create({
      data: {
        userId,
        cityId,
        quantity,
        totalPrice,
        status: 'pending', // Initial order status is 'pending'
      },
    });

    return res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating order' });
  }
}

// Get all orders by user
async function getOrders(req, res) {
  try {
    const userId = req.params.userId;

    const orders = await prisma.order.findMany({ where: { userId } });
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching orders' });
  }
}

// Update order status (e.g., 'shipped', 'delivered')
async function updateOrderStatus(req, res) {
  try {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating order status' });
  }
}

module.exports = { createOrder, getOrders, updateOrderStatus };
