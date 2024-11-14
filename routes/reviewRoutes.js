// reviewRoutes.js
// This file contains routes for managing city reviews: create, update, delete.

const express = require('express');
const {
  createReview,
  getReviewsByCity,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const router = express.Router();

// POST /reviews - Route for submitting a new review for a city
router.post('/', createReview);

// GET /reviews/city/:cityId - Route for fetching all reviews for a specific city
router.get('/city/:cityId', getReviewsByCity);

// PUT /reviews/:id - Route for updating a review by ID
router.put('/:id', updateReview);

// DELETE /reviews/:id - Route for deleting a review by ID
router.delete('/:id', deleteReview);

module.exports = router;
