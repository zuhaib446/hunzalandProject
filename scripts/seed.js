const { MongoClient } = require('mongodb');
require('dotenv').config();

const regions = [
  {
    title: "Hunza Valley",
    description: "Exclusive plots with breathtaking mountain views",
    imageSrc: "https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg",
    slug: "hunza",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Gilgit City",
    description: "Prime commercial and residential properties",
    imageSrc: "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg",
    slug: "gilgit",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Naltar Valley",
    description: "Land perfect for ski resorts and winter tourism",
    imageSrc: "https://images.pexels.com/photos/376697/pexels-photo-376697.jpeg",
    slug: "naltar",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Sost Dry Port",
    description: "Strategic commercial plots with trade potential",
    imageSrc: "https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg",
    slug: "sost-dry-port",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Attabad Lake",
    description: "Stunning lakefront properties for tourism development",
    imageSrc: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    slug: "attabad-lake",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const properties = [
  {
    title: "Premium Riverside Plot",
    location: "Near Eagle's Nest, Duikar, Hunza",
    area: "10 Kanal",
    price: "PKR 2,500,000 per Kanal",
    description: "A stunning riverside plot with panoramic views of the Hunza Valley and surrounding mountains. Perfect for a luxury vacation home or boutique hotel development. Comes with clean title and all necessary permissions for construction.",
    features: [
      "Riverside location",
      "Mountain views",
      "Access road available",
      "Electricity connection",
      "Water supply",
      "Peaceful surroundings"
    ],
    images: [
      "https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg",
      "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
      "https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg"
    ],
    isFeatured: true,
    region: "hunza",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Commercial Plot in Aliabad",
    location: "Main Karakoram Highway, Aliabad, Hunza",
    area: "5 Kanal",
    price: "PKR 5,000,000 per Kanal",
    description: "Prime commercial plot located on the main Karakoram Highway in Aliabad. High visibility and footfall make this ideal for retail, restaurant, or hotel development. All utilities available and ready for immediate development.",
    features: [
      "Highway frontage",
      "Commercial zone",
      "High visibility",
      "All utilities available",
      "Ready for construction",
      "Near major attractions"
    ],
    images: [
      "https://images.pexels.com/photos/5524165/pexels-photo-5524165.jpeg",
      "https://images.pexels.com/photos/4947761/pexels-photo-4947761.jpeg",
      "https://images.pexels.com/photos/9878953/pexels-photo-9878953.jpeg"
    ],
    isFeatured: true,
    region: "hunza",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const cars = [
  {
    title: "Toyota Land Cruiser V8",
    description: "Luxury 4x4 SUV perfect for mountain terrain. Comfortable seating for 7 passengers with ample luggage space.",
    pricePerDay: 15000,
    isAvailable: true,
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
    await db.collection('regions').deleteMany({});
    await db.collection('properties').deleteMany({});
    await db.collection('cars').deleteMany({});

    // Insert new data
    await db.collection('regions').insertMany(regions);
    await db.collection('properties').insertMany(properties);
    await db.collection('cars').insertMany(cars);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();