// reviewController.js
// This file handles the creation, update, and deletion of reviews for cities.

const { prisma } = require('../config/db'); // Prisma Client to interact with the database

// Add a review to a city
async function addReview(req, res) {
  try {
    const { cityId, userId, rating, comment } = req.body;

    // Create a new review in the database
    const newReview = await prisma.review.create({
      data: {
        cityId,
        userId,
        rating,
        comment,
      },
    });

    return res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error adding review' });
  }
}

// Update a review
async function updateReview(req, res) {
  try {
    const reviewId = parseInt(req.params.id);
    const { rating, comment } = req.body;

    // Update the review in the database
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { rating, comment },
    });

    return res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating review' });
  }
}

// Delete a review
async function deleteReview(req, res) {
  try {
    const reviewId = parseInt(req.params.id);

    // Delete the review from the database
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting review' });
  }
}

module.exports = { addReview, updateReview, deleteReview };
