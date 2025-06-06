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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Gilgit City</h2>
              <p className="mb-4 text-muted-foreground">
                Gilgit, the vibrant capital of Gilgit-Baltistan, is a thriving urban center at the crossroads of the ancient Silk Road and the modern Karakoram Highway. Surrounded by majestic peaks and traversed by the Gilgit and Hunza Rivers, the city is a gateway to some of the world’s most breathtaking landscapes.
              </p>
              <p className="mb-4 text-muted-foreground">
                As a rapidly developing city, Gilgit offers a unique blend of natural beauty, cultural richness, and modern amenities. The city is renowned for its friendly communities, bustling bazaars, and its role as a hub for adventure tourism, trade, and investment.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots in Gilgit are carefully selected in prime locations, offering excellent connectivity and access to urban amenities while maintaining the charm of mountain living. Whether you seek a home, a business opportunity, or a long-term investment, Gilgit is the perfect destination.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l4 4-4 4-4-4 4-4zm0 8v12"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Prime Location</p>
                    <p className="text-muted-foreground text-sm">Central city plots with excellent connectivity to all major routes and amenities.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2 4 4 8-8 2 2-10 10z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Commercial Hub</p>
                    <p className="text-muted-foreground text-sm">Growing business district with high ROI potential and a thriving local economy.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3"></path><circle cx="12" cy="12" r="10"></circle></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Urban Development</p>
                    <p className="text-muted-foreground text-sm">Rapidly expanding infrastructure, modern schools, hospitals, and recreational facilities.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.93c-4.02-.47-7.19-3.85-7.19-7.93 0-.62.08-1.21.21-1.79l5.98 5.98v.01c.13.13.29.22.47.22.18 0 .34-.09.47-.22l2.1-2.1c.13-.13.22-.29.22-.47 0-.18-.09-.34-.22-.47l-5.98-5.98c.58-.13 1.17-.21 1.79-.21 4.08 0 7.46 3.17 7.93 7.19l-2.1 2.1c-.13.13-.22.29-.22.47 0 .18.09.34.22.47l2.1 2.1z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Adventure & Culture</p>
                    <p className="text-muted-foreground text-sm">Gateway to trekking, mountaineering, and rich local traditions and festivals.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                >
                  Contact Us for Gilgit Opportunities
                </a>
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