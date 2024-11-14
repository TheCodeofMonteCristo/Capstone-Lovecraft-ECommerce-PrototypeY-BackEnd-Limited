// seed.js
// This script is used to seed the database with initial cities.

const { prisma } = require('./config/db'); // Import Prisma client

// Sample cities to populate the database
const cities = [
  {
    name: "Atlantis",
    description: "A mythical city beneath the sea, with ancient ruins.",
    price: 1000.00,
    imageUrl: "https://example.com/atlantis.jpg"
  },
  {
    name: "Lima",
    description: "A modern city with a rich cultural history in South America.",
    price: 750.00,
    imageUrl: "https://example.com/lima.jpg"
  },
  {
    name: "Cairo",
    description: "The bustling capital of Egypt, home to the pyramids.",
    price: 1200.00,
    imageUrl: "https://example.com/cairo.jpg"
  }
];

// Function to seed the database with cities
async function main() {
  console.log('Seeding cities...');

  // Clear existing cities (optional)
  await prisma.city.deleteMany();

  // Insert each city into the database
  for (const city of cities) {
    await prisma.city.create({
      data: city,
    });
  }

  console.log('Seeding completed.');
}

// Call the main function to run the seeding
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
