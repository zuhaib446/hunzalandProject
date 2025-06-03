"use client"
import React from 'react'
import { Car } from '@/lib/models/car'
import { connectDB } from '@/lib/mongodb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Card key={car._id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={car.images[0]} 
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                <p className="text-muted-foreground mb-4">{car.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold">
                    PKR {car.pricePerDay.toLocaleString()} / day
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    car.isAvailable 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {car.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <Button 
                  className="w-full"
                  disabled={!car.isAvailable}
                  onClick={() => window.open('https://wa.me/923468824466?text=I%20am%20interested%20in%20renting%20this%20car:%20' + car.title, '_blank')}
                >
                  {car.isAvailable ? 'Book Now' : 'Not Available'}
                </Button>
              </div>
            </Card>
          ))}
          {cars.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">No cars available at the moment.</p>
              <p className="mt-2 text-muted-foreground">Please check back later or contact us for custom requirements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}