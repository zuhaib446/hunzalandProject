import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'

const heroImages = [
  "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg",
  "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg",
  "https://images.pexels.com/photos/358532/pexels-photo-358532.jpeg"
]

async function getGilgitProperties() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    return await Property.find({ region: 'gilgit' }).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching Gilgit properties:', error);
    return [];
  }
}


export default async function GilgitPage() {
  const properties = await getGilgitProperties();
  
  return (
    <div>
      <HeroSection 
        title="Gilgit Land For Sale"
        subtitle="Discover premium land opportunities in the heart of Gilgit city with excellent investment potential and strategic locations."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties in Gilgit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties across Gilgit City.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available in Gilgit at the moment.</p>
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
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Gilgit City</h2>
              <p className="mb-4 text-muted-foreground">
                Gilgit is the capital city of Gilgit-Baltistan, Pakistan. Located in a strategic position at the confluence of the Gilgit and Hunza Rivers, it serves as the gateway to the Karakoram Highway and the China-Pakistan Economic Corridor.
              </p>
              <p className="mb-4 text-muted-foreground">
                As a rapidly developing urban center, Gilgit offers excellent investment opportunities in both commercial and residential properties. The city's growing infrastructure and position as an administrative and commercial hub make it an attractive location for property investment.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots in Gilgit are carefully selected in prime locations, offering excellent connectivity and access to urban amenities while maintaining the charm of mountain living.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Prime Location:</span> Central city plots with excellent connectivity.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Commercial Hub:</span> Growing business district with high ROI potential.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Urban Development:</span> Rapidly expanding infrastructure and amenities.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg" 
                  alt="Gilgit City View" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg" 
                  alt="Gilgit City Center" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.pexels.com/photos/358532/pexels-photo-358532.jpeg" 
                  alt="Gilgit Panorama" 
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