// cityController.js
// This file manages CRUD operations for cities (treated as products).

const { prisma } = require('../config/db'); // Prisma Client to interact with the database

// Create a new city
async function createCity(req, res) {
  try {
    const { name, description, price, imageUrl } = req.body;

    // Create a new city in the database
    const newCity = await prisma.city.create({
      data: { name, description, price, imageUrl },
    });

    return res.status(201).json({ message: 'City created successfully', city: newCity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during city creation' });
  }
}

// Get all cities
async function getCities(req, res) {
  try {
    const cities = await prisma.city.findMany();
    return res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching cities' });
  }
}

// Get a single city by ID
async function getCityById(req, res) {
  try {
    const cityId = parseInt(req.params.id);

    const city = await prisma.city.findUnique({ where: { id: cityId } });
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    return res.status(200).json(city);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching city details' });
  }
}

// Update city details
async function updateCity(req, res) {
  try {
    const cityId = parseInt(req.params.id);
    const { name, description, price, imageUrl } = req.body;

    const updatedCity = await prisma.city.update({
      where: { id: cityId },
      data: { name, description, price, imageUrl },
    });

    return res.status(200).json({ message: 'City updated successfully', city: updatedCity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating city' });
  }
}

// Delete a city
async function deleteCity(req, res) {
  try {
    const cityId = parseInt(req.params.id);

    await prisma.city.delete({
      where: { id: cityId },
    });

    return res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting city' });
  }
}

module.exports = { createCity, getCities, getCityById, updateCity, deleteCity };
