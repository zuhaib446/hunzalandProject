import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
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

const heroImages = [
  'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
  'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg',
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'
];

async function getCars() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    const cars = await Car.find({}).sort({ createdAt: -1 }).lean();
    return cars.map((car: any) => ({
      ...car,
      _id: car._id.toString(),
      createdAt: car.createdAt?.toISOString?.() ?? '',
      updatedAt: car.updatedAt?.toISOString?.() ?? '',
    }));
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export default async function RentACarPage() {
  const cars = await getCars();
  
  return (
    <div>
      <HeroSection
        title="Rent a Car in Hunza, Gilgit & Skardu"
        subtitle="Travel the northern areas of Pakistan in comfort and style. Choose from our fleet of premium vehicles for your next adventure."
        buttonText="Book Now"
        buttonLink="/contact"
        images={heroImages}
      />

      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Cars for Rent</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our selection of reliable SUVs, 4x4s, and vans—perfect for exploring mountains, valleys, and cities.
            </p>
          </div>
          <CarList cars={cars} />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Rent With Us?</h2>
              <p className="mb-4 text-muted-foreground">
                Our car rental service is designed for comfort, safety, and adventure. Whether you’re planning a family trip, a group tour, or a solo journey, we have the right vehicle for you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"></path><circle cx="12" cy="13" r="4"></circle><path d="M12 9V5"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Premium Fleet</p>
                    <p className="text-muted-foreground text-sm">Well-maintained SUVs, 4x4s, and vans for every terrain and group size.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 17v-2a4 4 0 018 0v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Professional Drivers</p>
                    <p className="text-muted-foreground text-sm">Experienced local drivers for a safe and enjoyable journey.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2 4 4 8-8 2 2-10 10z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Flexible Packages</p>
                    <p className="text-muted-foreground text-sm">Daily, weekly, and custom rental plans to fit your travel needs.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">24/7 Support</p>
                    <p className="text-muted-foreground text-sm">Our team is always available to assist you throughout your journey.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                >
                  Book Your Car Now
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg" 
                  alt="Car Rental Hunza" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg" 
                  alt="Car Rental Gilgit" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg" 
                  alt="Car Rental Skardu" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}