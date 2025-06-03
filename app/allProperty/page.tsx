import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import { Property } from '@/lib/models/property'
import { connectDB } from '@/lib/mongodb'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'All Properties - Hunza Real Estate',
  description: 'Explore all available properties for sale in Hunza, Gilgit, and Northern Pakistan. Discover premium land and investment opportunities.',
  keywords: [
    'Hunza properties',
    'Gilgit real estate',
    'Northern Pakistan land',
    'property for sale Hunza',
    'investment property Gilgit',
    'premium land Northern Pakistan',
    'commercial plots Hunza',
    'residential properties Gilgit',
    'mountain view properties',
    'Hunza Valley real estate',
    'land for sale hunza',
    'Hunza real estate listings'
  ],
  openGraph: {
    title: 'All Properties - Hunza Real Estate',
    description: 'Explore all available properties for sale in Hunza, Gilgit, and Northern Pakistan. Discover premium land and investment opportunities.',
    url: 'https://www.hunzarealestate.com/all-properties',
    images: [
      {
        url: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
        width: 1200,
        height: 630,
        alt: 'Hunza Properties'
      }
    ]
  }
}

const heroImages = [
  "https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg",
  "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
  "https://images.pexels.com/photos/2613946/pexels-photo-2613946.jpeg"
]

const PAGE_SIZE = 6;

async function getAllProperties(page: number, limit: number) {
  const db = await connectDB();
  if (!db) return { properties: [], total: 0 };

  try {
    const total = await Property.countDocuments({});
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return { properties, total };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return { properties: [], total: 0 };
  }
}

interface Props {
  searchParams?: { page?: string }
}

export default async function AllPropertiesPage({ searchParams }: Props) {
  const page = Number(searchParams?.page) > 0 ? Number(searchParams?.page) : 1;
  const { properties, total } = await getAllProperties(page, PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <HeroSection 
        title="All Properties For Sale"
        subtitle="Explore our extensive collection of premium land and properties across various regions."
        buttonText="Contact Us"
        buttonLink="/contact"
        images={heroImages}
      />
      
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of premium land plots and properties across multiple regions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No properties available at the moment.</p>
                <p className="mt-2 text-muted-foreground">Please check back later or contact us for custom requirements.</p>
              </div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <a
                  key={i + 1}
                  href={`?page=${i + 1}`}
                  className={`px-4 py-2 rounded border ${page === i + 1 ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
                >
                  {i + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}