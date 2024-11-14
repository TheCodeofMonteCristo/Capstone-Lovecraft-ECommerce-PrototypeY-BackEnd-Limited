// auth.test.js
// This file contains tests for user authentication: signup and login.

const request = require('supertest');
const app = require('../server'); // Import the Express app
const prisma = require('../config/db'); // Import Prisma client for database interaction

describe('Authentication Routes', () => {
  let userCredentials = {
    email: 'testuser@example.com',
    password: 'Password123'
  };

  // Test user signup
  it('should signup a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send(userCredentials);

    expect(response.status).toBe(201); // Expecting status 201 (Created)
    expect(response.body).toHaveProperty('token'); // Expecting a JWT token
  });

  // Test user login
  it('should login an existing user', async () => {
    // First, create the user by signing up
    await request(app).post('/auth/signup').send(userCredentials);

    const response = await request(app)
      .post('/auth/login')
      .send(userCredentials);

    expect(response.status).toBe(200); // Expecting status 200 (OK)
    expect(response.body).toHaveProperty('token'); // Expecting a JWT token
  });

  // Test login with invalid credentials
  it('should return an error for invalid login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400); // Expecting status 400 (Bad Request)
    expect(response.body).toHaveProperty('error');
  });
});
