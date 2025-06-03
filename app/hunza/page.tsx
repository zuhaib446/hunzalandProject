import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'


// get real image URL of Hunza from any free image source
const heroImages = [
  'https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg',
  'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
];

async function getHunzaProperties() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    return await Property.find({ region: 'hunza' }).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching Hunza properties:', error);
    return [];
  }
}

export default async function HunzaPage() {
  const properties = await getHunzaProperties();
  
  return (
    <div>
      <HeroSection 
        title="Hunza Land For Sale"
        subtitle="Discover premium land opportunities in the breathtaking Hunza Valley with stunning mountain views and investment potential."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties in Hunza</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties across Hunza Valley.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available in Hunza at the moment.</p>
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
              <h2 className="text-3xl font-bold mb-4">About Hunza Valley</h2>
              <p className="mb-4 text-muted-foreground">
                Hunza Valley is a mountainous region in Gilgit-Baltistan, Pakistan. The valley is situated at an elevation of over 2,500 meters and is surrounded by several mountain peaks over 7,000 meters.
              </p>
              <p className="mb-4 text-muted-foreground">
                Known for its breathtaking natural scenery, ancient culture, and friendly people, Hunza is a popular tourist destination and increasingly attractive for property investors looking for serene mountain retreats or tourism development opportunities.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots in Hunza offer some of the most spectacular views in the region, with many featuring panoramic vistas of the surrounding mountains including Rakaposhi, Ultar, and other peaks.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Strategic Location:</span> Access to main roads, utilities, and amenities.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Tourism Potential:</span> Growing tourism sector with high rental yields.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Capital Appreciation:</span> Hunza property values consistently rising.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg" 
                  alt="Hunza Valley Scenery" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg" 
                  alt="Hunza Valley Mountains" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg" 
                  alt="Hunza Valley Panorama" 
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