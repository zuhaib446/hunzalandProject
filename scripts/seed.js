const { MongoClient } = require('mongodb');
require('dotenv').config();

const cars = [
  {
    title: "Toyota Land Cruiser V8",
    description: "Luxury 4x4 SUV perfect for mountain terrain. Comfortable seating for 7 passengers with ample luggage space.",
    pricePerDay: 15000,
    isAvailable: true,
    isFeatured: true,
    withDriver: true,
    fuelIncluded: true,
    images: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Toyota Revo",
    description: "Reliable double cabin pickup with excellent off-road capabilities. Perfect for adventure trips.",
    pricePerDay: 12000,
    isAvailable: true,
    isFeatured: true,
    withDriver: true,
    fuelIncluded: false,
    images: [
      "https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg",
      "https://images.pexels.com/photos/2676097/pexels-photo-2676097.jpeg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Suzuki APV",
    description: "Spacious van suitable for family trips. Comfortable seating for 8 passengers with roof carrier.",
    pricePerDay: 8000,
    isAvailable: true,
    isFeatured: false,
    withDriver: true,
    fuelIncluded: false,
    images: [
      "https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg",
      "https://images.pexels.com/photos/2533093/pexels-photo-2533093.jpeg"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('hunzaland');

  try {
    // Clear existing data
    await db.collection('cars').deleteMany({});

    // Insert new data
    await db.collection('cars').insertMany(cars);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();