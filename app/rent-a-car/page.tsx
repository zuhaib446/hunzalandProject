import React from 'react'
import { Car } from '@/lib/models/car'
import { connectDB } from '@/lib/mongodb'
import { Metadata } from 'next'
import CarList from './CarList';

export const metadata: Metadata = {
  title: 'Rent a Car - Hunza, Gilgit, Skardu',
  description: 'Explore the breathtaking northern areas of Pakistan with our premium car rental services. Rent a car in Hunza, Gilgit, and Skardu for an unforgettable journey.',
  keywords: [
    'rent a car Hunza',
    'car rental Gilgit',
    'Skardu car hire',
    'northern Pakistan car rental',
    'premium car rental Hunza',
    'explore Hunza by car',
    'Gilgit car hire services',
    'Skardu vehicle rental',
    'car rental northern areas',
    'affordable car rental Hunza',
    'luxury car rental Gilgit',
    '4x4 rental Hunza',
    'SUV rental Skardu',
    'car rental with driver Hunza',
    'self-drive car rental Gilgit',
    'rent a car Skardu',
    'car rental services Pakistan',
    'Hunza Valley car rental',
    'Gilgit Baltistan car hire',
    'rent a car northern Pakistan',
    'explore Skardu by car',
    'car rental for tourists Hunza',
    'adventure car rental Gilgit'
  ],
  openGraph: {
    title: 'Rent a Car - Hunza, Gilgit, Skardu',
    description: 'Explore the breathtaking northern areas of Pakistan with our premium car rental services. Rent a car in Hunza, Gilgit, and Skardu for an unforgettable journey.',
    url: 'https://www.hunzarealestate.com/rent-a-car',
    images: [
      {
        url: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rent a Car in Hunza'
      }
    ]
  }
}

async function getCars() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    return await Car.find({}).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}


export default async function RentACarPage() {
  const cars = await getCars();
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Rent a Car in Gilgit, Hunza, and Skardu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the breathtaking northern areas of Pakistan with our premium car rental services.
          </p>
        </div>
        <CarList cars={cars} />
      </div>
    </div>
  )
}