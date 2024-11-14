// adminController.js
// This file handles admin actions such as managing cities and users.

const { prisma } = require('../config/db'); // Prisma Client to interact with the database

// Admin: Create a new city
async function createCity(req, res) {
  try {
    const { name, description, price, imageUrl } = req.body;

    const newCity = await prisma.city.create({
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });

    return res.status(201).json({ message: 'City created successfully', city: newCity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating city' });
  }
}

// Admin: Delete a user
async function deleteUser(req, res) {
  try {
    const userId = parseInt(req.params.id);

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting user' });
  }
}

module.exports = { createCity, deleteUser };
