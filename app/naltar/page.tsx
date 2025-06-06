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
    const properties = await Property.find({ region: 'naltar' }).sort({ createdAt: -1 }).lean();
    return properties.map((property: any) => ({
      ...property,
      _id: property._id.toString(),
      createdAt: property.createdAt?.toISOString?.() ?? '',
      updatedAt: property.updatedAt?.toISOString?.() ?? '',
    }));
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
      
      <section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Naltar Valley</h2>
        <p className="mb-4 text-muted-foreground">
          Naltar Valley, nestled in the Karakoram Range near Gilgit, is a hidden gem renowned for its lush pine forests, vibrant meadows, and crystal-clear lakes. Famous for its world-class ski slopes and breathtaking landscapes, Naltar is a year-round destination for adventure seekers and nature lovers.
        </p>
        <p className="mb-4 text-muted-foreground">
          The valley is home to a warm and welcoming community, rich in local culture and traditions. With increasing tourism and improved infrastructure, Naltar offers unique opportunities for investment in hospitality, eco-tourism, and premium real estate.
        </p>
        <p className="mb-6 text-muted-foreground">
          Our land plots in Naltar are carefully selected for their scenic beauty, accessibility, and proximity to key attractions like Naltar Lakes and the ski resort. Whether you dream of a mountain retreat, a boutique lodge, or a high-return investment, Naltar Valley is the perfect choice.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l4 4-4 4-4-4 4-4zm0 8v12"></path></svg>
            </span>
            <div>
              <p className="font-semibold text-primary mb-1">Natural Beauty</p>
              <p className="text-muted-foreground text-sm">Surrounded by pine forests, alpine meadows, and the famous Naltar Lakes.</p>
            </div>
          </div>
          <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2 4 4 8-8 2 2-10 10z"></path></svg>
            </span>
            <div>
              <p className="font-semibold text-primary mb-1">Adventure Destination</p>
              <p className="text-muted-foreground text-sm">Pakistan’s top ski resort and a hub for hiking, trekking, and mountain biking.</p>
            </div>
          </div>
          <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
            </span>
            <div>
              <p className="font-semibold text-primary mb-1">Cultural Heritage</p>
              <p className="text-muted-foreground text-sm">Experience the unique traditions and hospitality of the local community.</p>
            </div>
          </div>
          <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.93c-4.02-.47-7.19-3.85-7.19-7.93 0-.62.08-1.21.21-1.79l5.98 5.98v.01c.13.13.29.22.47.22.18 0 .34-.09.47-.22l2.1-2.1c.13-.13.22-.29.22-.47 0-.18-.09-.34-.22-.47l-5.98-5.98c.58-.13 1.17-.21 1.79-.21 4.08 0 7.46 3.17 7.93 7.19l-2.1 2.1c-.13.13-.22.29-.22.47 0 .18.09.34.22.47l2.1 2.1z"></path></svg>
            </span>
            <div>
              <p className="font-semibold text-primary mb-1">Investment Potential</p>
              <p className="text-muted-foreground text-sm">Ideal for eco-resorts, hotels, and high-value real estate in a growing tourism market.</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
          >
            Contact Us for Naltar Opportunities
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg overflow-hidden h-64">
          <img 
            src="https://images.pexels.com/photos/376697/pexels-photo-376697.jpeg" 
            alt="Naltar Valley Forest" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden h-64">
          <img 
            src="https://images.pexels.com/photos/290452/pexels-photo-290452.jpeg" 
            alt="Naltar Valley Lake" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden h-64 col-span-2">
          <img 
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg" 
            alt="Naltar Valley Panorama" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>
      
      {/* Rest of the content remains the same */}
    </div>
  )
}