import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Sost Land For Sale - Premium Properties in Sost Dry Port',
  description: 'Explore premium land opportunities in the breathtaking Sost Dry Port region. Discover stunning mountain views and investment potential with our exclusive properties.',
  keywords: [
    'Sost land for sale',
    'Sost properties',
    'Sost real estate',
    'land investment Sost',
    'Sost Dry Port land',
    'buy land Sost',
    'Sost property market',
    'Sost real estate investment',
    'premium land Sost',
    'mountain view properties Sost'
  ],
  openGraph: {
    title: 'Sost Land For Sale - Premium Properties in Sost Dry Port',
    description: 'Explore premium land opportunities in the breathtaking Sost Dry Port region. Discover stunning mountain views and investment potential with our exclusive properties.',
    url: 'https://www.hunzarealestate.com/sost-dry-port',
    images: [
      {
        url: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sost Land For Sale'
      }
    ]
  }
}

const heroImages = [
  'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
  'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
];

async function getSostProperties() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    return await Property.find({ region: 'sost-dry-port' }).sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error fetching Sost properties:', error);
    return [];
  }
}

export default async function SostPage() {
  const properties = await getSostProperties();

  return (
    <div>
      <HeroSection 
        title="Sost Land For Sale"
        subtitle="Discover premium land opportunities in the breathtaking Sost Dry Port region with stunning mountain views and investment potential."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties in Sost</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties across Sost Dry Port.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available in Sost at the moment.</p>
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
              <h2 className="text-3xl font-bold mb-4">About Sost Dry Port</h2>
              <p className="mb-4 text-muted-foreground">
                Sost Dry Port is a vital region in Gilgit-Baltistan, Pakistan, known for its strategic location on the China-Pakistan border and its role as a trade gateway. The area is surrounded by dramatic landscapes, towering peaks, and serene valleys.
              </p>
              <p className="mb-4 text-muted-foreground">
                Sost is famous for its breathtaking natural beauty, rich culture, and growing economic significance. The region attracts tourists, traders, and investors from around the world, making it an increasingly popular destination for property investment.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots in Sost offer unparalleled views of the surrounding mountains and valleys, with many properties located near iconic sites and trade routes.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                  <p><span className="font-medium">Strategic Location:</span> Close to main roads, utilities, and amenities.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                <p><span className="font-medium">Trade & Tourism Potential:</span> Growing trade and tourism sector with high rental yields.</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2" />
                <p><span className="font-medium">Capital Appreciation:</span> Sost property values consistently rising.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Sost Valley Lake" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Sost Mountains" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                  alt="Sost Dry Port National Park" 
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest in Sost?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sost offers a unique blend of natural beauty, cultural richness, and investment potential. With its stunning landscapes, strategic trade location, and growing tourism sector, it's an ideal location for property investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add more content here as needed */}
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Scenic Beauty</h3>
              <p className="text-muted-foreground mb-4">
                Sost is renowned for its breathtaking landscapes, including majestic mountains, serene valleys, and its proximity to the Karakoram Highway.
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
                Sost's real estate market is poised for growth, making it an attractive option for investors seeking long-term value.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}