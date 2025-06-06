import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'

const heroImages = [
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg"
]

async function getAttabadProperties() {
  const db = await connectDB();
  if (!db) return [];
  
  try {
    const properties = await Property.find({ region: 'attabad-lake' }).sort({ createdAt: -1 }).lean();
    return properties.map((property: any) => ({
      ...property,
      _id: property._id.toString(),
      createdAt: property.createdAt?.toISOString?.() ?? '',
      updatedAt: property.updatedAt?.toISOString?.() ?? '',
    }));
  } catch (error) {
    console.error('Error fetching Attabad Lake properties:', error);
    return [];
  }
}

export default async function AttabadLakePage() {
  const properties = await getAttabadProperties();
  
  return (
    <div>
      <HeroSection 
        title="Attabad Lake Land For Sale"
        subtitle="Discover premium land opportunities along the stunning turquoise shores of Attabad Lake, perfect for resorts, tourism, and investment."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties at Attabad Lake</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties along the breathtaking Attabad Lake.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available at Attabad Lake at the moment.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Attabad Lake</h2>
              <p className="mb-4 text-muted-foreground">
                Attabad Lake, formed in 2010, is one of Pakistan’s most iconic natural wonders. Its striking turquoise waters, surrounded by dramatic mountains, have made it a top destination for tourists, adventurers, and investors alike.
              </p>
              <p className="mb-4 text-muted-foreground">
                The lake area is famous for boating, jet skiing, luxury resorts, and lakeside cafes. The local community is welcoming, and the region is rapidly developing with improved infrastructure and growing tourism.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots at Attabad Lake are selected for their scenic views, easy access, and proximity to key attractions. Whether you envision a lakeside retreat, a boutique resort, or a high-yield investment, Attabad Lake is the perfect choice.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l4 4-4 4-4-4 4-4zm0 8v12"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Turquoise Waters</p>
                    <p className="text-muted-foreground text-sm">Unmatched views of the lake’s crystal-clear blue waters and surrounding peaks.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2 4 4 8-8 2 2-10 10z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Tourism Hotspot</p>
                    <p className="text-muted-foreground text-sm">Top destination for boating, water sports, and lakeside leisure activities.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Modern Amenities</p>
                    <p className="text-muted-foreground text-sm">Rapidly developing area with resorts, cafes, and improved road access.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.93c-4.02-.47-7.19-3.85-7.19-7.93 0-.62.08-1.21.21-1.79l5.98 5.98v.01c.13.13.29.22.47.22.18 0 .34-.09.47-.22l2.1-2.1c.13-.13.22-.29.22-.47 0-.18-.09-.34-.22-.47l-5.98-5.98c.58-.13 1.17-.21 1.79-.21 4.08 0 7.46 3.17 7.93 7.19l-2.1 2.1c-.13.13-.22.29-.22.47 0 .18.09.34.22.47l2.1 2.1z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Investment Potential</p>
                    <p className="text-muted-foreground text-sm">Ideal for resorts, hotels, and high-value real estate in a booming tourism market.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                >
                  Contact Us for Attabad Lake Opportunities
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Attabad Lake View" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg" 
                  alt="Attabad Lake Shore" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Attabad Lake Panorama" 
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