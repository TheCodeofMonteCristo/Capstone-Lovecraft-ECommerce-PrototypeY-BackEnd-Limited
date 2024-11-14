// admin.test.js
// This file contains tests for admin routes: user management, city management.

const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('Admin Routes', () => {
  let cityId;
  const adminCredentials = { email: 'admin@example.com', password: 'Admin123' };

  // Test fetching all users (admin only)
  it('should fetch all users', async () => {
    const response = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${adminCredentials.token}`); // Assuming JWT token for admin auth

    expect(response.status).toBe(200); // Expecting status 200 (OK)
  });

  // Test creating a city (admin only)
  it('should create a new city as admin', async () => {
    const cityData = { name: 'New City', description: 'A beautiful new city', price: 500000 };
    const response = await request(app)
      .post('/admin/cities')
      .send(cityData)
      .set('Authorization', `Bearer ${adminCredentials.token}`);

    cityId = response.body.id;

    expect(response.status).toBe(201); // Expecting status 201 (Created)
    expect(response.body).toHaveProperty('id');
  });

  // Test deleting a city (admin only)
  it('should delete a city as admin', async () => {
    const response = await request(app)
      .delete(`/admin/cities/${cityId}`)
      .set('Authorization', `Bearer ${adminCredentials.token}`);

    expect(response.status).toBe(200); // Expecting status 200 (OK)
  });
});
