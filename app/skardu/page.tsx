import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Skardu Land For Sale - Premium Properties in Skardu Valley',
  description: 'Explore premium land opportunities in the breathtaking Skardu Valley. Discover stunning mountain views and investment potential with our exclusive properties.',
  keywords: [
    'Skardu land for sale',
    'Skardu properties',
    'Skardu real estate',
    'land investment Skardu',
    'Skardu Valley land',
    'buy land Skardu',
    'Skardu property market',
    'Skardu real estate investment',
    'premium land Skardu',
    'mountain view properties Skardu'
  ],
  openGraph: {
    title: 'Skardu Land For Sale - Premium Properties in Skardu Valley',
    description: 'Explore premium land opportunities in the breathtaking Skardu Valley. Discover stunning mountain views and investment potential with our exclusive properties.',
    url: 'https://www.hunzarealestate.com/skardu',
    images: [
      {
        // GET REAL IMAGE URL OF SKARDU FORM ANY FREE IMAGE SOURCE
        url: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
        width: 1200,
        height: 630,
        alt: 'Skardu Land For Sale'
      }
    ]
  }
}

const heroImages = [
  'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
  'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
];

async function getSkarduProperties() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    return await Property.find({ region: 'skardu' }).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching Skardu properties:', error);
    return [];
  }
}

export default async function SkarduPage() {
  const properties = await getSkarduProperties();

  return (
    <div>
      <HeroSection 
        title="Skardu Land For Sale"
        subtitle="Discover premium land opportunities in the breathtaking Skardu Valley with stunning mountain views and investment potential."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties in Skardu</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties across Skardu Valley.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available in Skardu at the moment.</p>
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
              <h2 className="text-3xl font-bold mb-4">About Skardu Valley</h2>
              <p className="mb-4 text-muted-foreground">
                Skardu Valley is a stunning region in Gilgit-Baltistan, Pakistan, known for its dramatic landscapes, towering peaks, and serene lakes. It serves as the gateway to some of the world's highest mountains, including K2.
              </p>
              <p className="mb-4 text-muted-foreground">
                Skardu is famous for its breathtaking natural beauty, rich culture, and warm hospitality. The valley attracts tourists, trekkers, and adventure seekers from around the world, making it an increasingly popular destination for property investment.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots in Skardu offer unparalleled views of the surrounding mountains and valleys, with many properties located near iconic sites like Shangrila Lake, Sheosar Lake, and the Deosai National Park.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Strategic Location:</span> Close to main roads, utilities, and amenities.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                <p><span className="font-medium">Tourism Potential:</span> Growing tourism sector with high rental yields.</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                <p><span className="font-medium">Capital Appreciation:</span> Skardu property values consistently rising.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Skardu Valley Lake" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Skardu Mountains" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                  alt="Deosai National Park" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest in Skardu?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Skardu offers a unique blend of natural beauty, cultural richness, and investment potential. With its stunning landscapes and growing tourism sector, it's an ideal location for property investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add more content here as needed */}
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Scenic Beauty</h3>
              <p className="text-muted-foreground mb-4">
                Skardu is renowned for its breathtaking landscapes, including majestic mountains, serene lakes, and lush valleys.
              </p>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Cultural Richness</h3>
              <p className="text-muted-foreground mb-4">
                The region is rich in culture and history, with friendly locals and unique traditions that enhance the living experience.
              </p>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Investment Potential</h3>
              <p className="text-muted-foreground mb-4">
                Skardu's real estate market is poised for growth, making it an attractive option for investors seeking long-term value.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}