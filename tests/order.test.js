// order.test.js
// This file contains tests for order creation, retrieval, and order status updates.

const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('Order Routes', () => {
  let orderId;
  const orderData = { cityId: 1, userId: 1, quantity: 1 };

  // Test creating an order
  it('should create a new order', async () => {
    const response = await request(app)
      .post('/orders')
      .send(orderData);

    orderId = response.body.id;

    expect(response.status).toBe(201); // Expecting status 201 (Created)
    expect(response.body).toHaveProperty('id');
  });

  // Test fetching order by ID
  it('should retrieve an order by ID', async () => {
    const response = await request(app).get(`/orders/${orderId}`);
    expect(response.status).toBe(200); // Expecting status 200 (OK)
    expect(response.body.id).toBe(orderId);
  });

  // Test updating order status
  it('should update order status', async () => {
    const response = await request(app)
      .put(`/orders/${orderId}/status`)
      .send({ status: 'shipped' });

    expect(response.status).toBe(200); // Expecting status 200 (OK)
    expect(response.body.status).toBe('shipped');
  });
});
