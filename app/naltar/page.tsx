import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'

const heroImages = [
  "https://images.pexels.com/photos/376697/pexels-photo-376697.jpeg",
  "https://images.pexels.com/photos/290452/pexels-photo-290452.jpeg",
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
]

async function getNaltarProperties() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    return await Property.find({ region: 'naltar' }).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching Naltar properties:', error);
    return [];
  }
}

export default async function NaltarPage() {
  const properties = await getNaltarProperties();
  
  return (
    <div>
      <HeroSection 
        title="Naltar Valley Land For Sale"
        subtitle="Discover premium land opportunities in the scenic Naltar Valley, perfect for ski resorts and tourism development."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties in Naltar Valley</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties in Naltar Valley.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available in Naltar Valley at the moment.</p>
                <p className="mt-2 text-muted-foreground">Please check back later or contact us for custom requirements.</p>
              </div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Rest of the content remains the same */}
    </div>
  )
}