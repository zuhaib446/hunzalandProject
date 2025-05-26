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
    imageSrc: "https://images.pexels.com/photos/17913609/pexels-photo-17913609.jpeg",
    slug: "gilgit",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Naltar Valley",
    description: "Land perfect for ski resorts and winter tourism",
    imageSrc: "https://images.pexels.com/photos/27965152/pexels-photo-27965152.jpeg",
    slug: "naltar",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Sost Dry Port",
    description: "Strategic commercial plots with trade potential",
    imageSrc: "https://images.pexels.com/photos/12546315/pexels-photo-12546315.jpeg",
    slug: "sost-dry-port",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Attabad Lake",
    description: "Stunning lakefront properties for tourism development",
    imageSrc: "https://images.pexels.com/photos/31839244/pexels-photo-31839244.jpeg",
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

async function seedDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('hunzaland');

  try {
    // Clear existing data
    await db.collection('regions').deleteMany({});
    await db.collection('properties').deleteMany({});

    // Insert new data
    await db.collection('regions').insertMany(regions);
    await db.collection('properties').insertMany(properties);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
