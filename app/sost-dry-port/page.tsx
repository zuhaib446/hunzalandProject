import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'

const heroImages = [
  'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
  'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
];

async function getSostProperties() {
  const db = await connectDB();
  if (!db) return [];
  try {
    const properties = await Property.find({ region: 'sost-dry-port' }).sort({ createdAt: -1 }).lean();
    return properties.map((property: any) => ({
      ...property,
      _id: property._id.toString(),
      createdAt: property.createdAt?.toISOString?.() ?? '',
      updatedAt: property.updatedAt?.toISOString?.() ?? '',
    }));
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
        title="Sost Dry Port Land For Sale"
        subtitle="Explore premium land opportunities in the strategic Sost Dry Port region, gateway to China and Central Asia. Ideal for trade, tourism, and investment."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />

      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties in Sost Dry Port</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of premium land plots and properties in the Sost Dry Port region.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available in Sost Dry Port at the moment.</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Sost Dry Port</h2>
              <p className="mb-4 text-muted-foreground">
                Sost Dry Port, located at the northernmost border of Pakistan, is the country’s gateway to China via the Karakoram Highway. Surrounded by dramatic mountains and valleys, Sost is a hub for international trade, tourism, and cultural exchange.
              </p>
              <p className="mb-4 text-muted-foreground">
                The region is rapidly developing, with modern infrastructure, customs facilities, and growing business opportunities. Sost is not only a trade center but also a destination for adventurers and investors seeking unique prospects in a breathtaking landscape.
              </p>
              <p className="mb-6 text-muted-foreground">
                Our land plots in Sost Dry Port are selected for their strategic location, accessibility, and investment potential. Whether you’re interested in logistics, hospitality, or long-term capital growth, Sost offers unmatched opportunities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l4 4-4 4-4-4 4-4zm0 8v12"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Strategic Gateway</p>
                    <p className="text-muted-foreground text-sm">Pakistan’s main land route to China and Central Asia, ideal for trade and logistics.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 12l2-2 4 4 8-8 2 2-10 10z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Tourism & Culture</p>
                    <p className="text-muted-foreground text-sm">Gateway to the Karakoram, Silk Route, and unique cross-border cultural experiences.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Modern Infrastructure</p>
                    <p className="text-muted-foreground text-sm">Customs, transport, and business facilities with rapid development and connectivity.</p>
                  </div>
                </div>
                <div className="flex items-start bg-white dark:bg-card rounded-lg shadow p-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.93c-4.02-.47-7.19-3.85-7.19-7.93 0-.62.08-1.21.21-1.79l5.98 5.98v.01c.13.13.29.22.47.22.18 0 .34-.09.47-.22l2.1-2.1c.13-.13.22-.29.22-.47 0-.18-.09-.34-.22-.47l-5.98-5.98c.58-.13 1.17-.21 1.79-.21 4.08 0 7.46 3.17 7.93 7.19l-2.1 2.1c-.13.13-.22.29-.22.47 0 .18.09.34.22.47l2.1 2.1z"></path></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary mb-1">Investment Potential</p>
                    <p className="text-muted-foreground text-sm">High capital appreciation and rental yields in a fast-growing trade and tourism hub.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                >
                  Contact Us for Sost Opportunities
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg" 
                  alt="Sost Valley View" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg" 
                  alt="Sost Mountains" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 col-span-2">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                  alt="Sost Dry Port Panorama" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}