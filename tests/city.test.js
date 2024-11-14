// city.test.js
// This file contains tests for city-related API actions: create, update, delete, and fetch.

const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('City Routes', () => {
  let cityId;
  const cityData = {
    name: 'Atlantis',
    description: 'A mysterious city submerged in the ocean.',
    price: 1000000
  };

  // Test city creation
  it('should create a new city', async () => {
    const response = await request(app)
      .post('/cities')
      .send(cityData);

    cityId = response.body.id; // Store the created city ID for further tests

    expect(response.status).toBe(201); // Expecting status 201 (Created)
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(cityData.name);
  });

  // Test fetching all cities
  it('should fetch all cities', async () => {
    const response = await request(app).get('/cities');
    expect(response.status).toBe(200); // Expecting status 200 (OK)
    expect(Array.isArray(response.body)).toBe(true); // Should return an array of cities
  });

  // Test updating a city
  it('should update a city', async () => {
    const updatedData = { name: 'New Atlantis', price: 1200000 };
    const response = await request(app)
      .put(`/cities/${cityId}`)
      .send(updatedData);

    expect(response.status).toBe(200); // Expecting status 200 (OK)
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.price).toBe(updatedData.price);
  });

  // Test deleting a city
  it('should delete a city', async () => {
    const response = await request(app).delete(`/cities/${cityId}`);
    expect(response.status).toBe(200); // Expecting status 200 (OK)
  });
});
