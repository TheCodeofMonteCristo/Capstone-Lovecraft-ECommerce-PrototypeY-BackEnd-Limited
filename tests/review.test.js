// review.test.js
// This file contains tests for submitting, editing, and deleting reviews for cities.

const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('Review Routes', () => {
  let cityId;
  let reviewId;
  const cityData = { name: 'Atlantis', description: 'A submerged city', price: 1000000 };
  const reviewData = { rating: 5, comment: 'Amazing city!' };

  // Create city before testing reviews
  beforeAll(async () => {
    const response = await request(app).post('/cities').send(cityData);
    cityId = response.body.id;
  });

  // Test submitting a review
  it('should submit a review for a city', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ ...reviewData, cityId });

    reviewId = response.body.id; // Store the review ID for further tests

    expect(response.status).toBe(201); // Expecting status 201 (Created)
    expect(response.body.rating).toBe(reviewData.rating);
    expect(response.body.comment).toBe(reviewData.comment);
  });

  // Test editing a review
  it('should edit a review', async () => {
    const updatedReview = { rating: 4, comment: 'Great city, but not for everyone.' };
    const response = await request(app)
      .put(`/reviews/${reviewId}`)
      .send(updatedReview);

    expect(response.status).toBe(200); // Expecting status 200 (OK)
    expect(response.body.rating).toBe(updatedReview.rating);
    expect(response.body.comment).toBe(updatedReview.comment);
  });

  // Test deleting a review
  it('should delete a review', async () => {
    const response = await request(app).delete(`/reviews/${reviewId}`);
    expect(response.status).toBe(200); // Expecting status 200 (OK)
  });
});
