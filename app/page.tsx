import React from 'react'
import Link from 'next/link'
import HeroSection from '@/components/ui/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import RegionCard from '@/components/ui/RegionCard'
import { Button } from '@/components/ui/button'
import { PhoneCall, MapPin, Building, Award, Clock } from 'lucide-react'
import { Property } from '@/lib/models/property'
import { Region } from '@/lib/models/region'
import { Car } from '@/lib/models/car'
import { connectDB } from '@/lib/mongodb'
import { Card } from '@/components/ui/card'

const heroImages = [
  "https://scontent.fisb29-1.fna.fbcdn.net/v/t39.30808-6/476144270_1170414421758417_279955949777908870_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=rmtGVXY_gJIQ7kNvwFHmlA0&_nc_oc=AdmeTQgnHmEjPL3ImMBWq5W3FmXB2g4v2b4bNUF6fAjHy9WgRLwpbisNIpFtoPl6Mo8&_nc_zt=23&_nc_ht=scontent.fisb29-1.fna&_nc_gid=quBs0MGrthH6-z--emaalg&oh=00_AfLueX4bzMa3WFDqIw0AaQuzeT0E9RpuGlVn28c1aVAAQw&oe=684486C7",
  "https://images.pexels.com/photos/2613946/pexels-photo-2613946.jpeg",
  "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg"
]

async function getFeaturedProperties() {
  const db = await connectDB();
  if (!db) return [];
  try {
    const properties = await Property.find({ isFeatured: true }).sort({ createdAt: -1 }).lean();
    return properties.map((property: any) => ({
      ...property,
      _id: property._id.toString(),
      createdAt: property.createdAt?.toISOString?.() ?? '',
      updatedAt: property.updatedAt?.toISOString?.() ?? '',
    }));
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

async function getRegions() {
  const db = await connectDB();
  if (!db) return [];
  try {
    const regions = await Region.find({}).sort({ createdAt: -1 }).lean();
    return regions.map((region: any) => ({
      ...region,
      _id: region._id.toString(),
      createdAt: region.createdAt?.toISOString?.() ?? '',
      updatedAt: region.updatedAt?.toISOString?.() ?? '',
    }));
  } catch (error) {
    console.error('Error fetching regions:', error);
    return [];
  }
}

async function getFeaturedCars() {
  const db = await connectDB();
  if (!db) return [];
  try {
    const cars = await Car.find({ isAvailable: true, isFeatured: true }).limit(3).sort({ createdAt: -1 }).lean();
    return cars.map((car: any) => ({
      ...car,
      _id: car._id.toString(),
      createdAt: car.createdAt?.toISOString?.() ?? '',
      updatedAt: car.updatedAt?.toISOString?.() ?? '',
    }));
  } catch (error) {
    console.error('Error fetching featured cars:', error);
    return [];
  }
}

export default async function Home() {
  const [featuredProperties, regions, featuredCars] = await Promise.all([
    getFeaturedProperties(),
    getRegions(),
    getFeaturedCars()
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        title="Premium Properties in Northern Pakistan"
        subtitle="Discover exclusive investment opportunities in Hunza, Gilgit, and surrounding regions with breathtaking mountain views and high appreciation potential."
        images={heroImages}
      />

      <section className="py-16 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer premium land and property opportunities in the most scenic locations of northern Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Locations</h3>
              <p className="text-muted-foreground">
                Carefully selected plots in the most desirable and scenic locations across northern Pakistan.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Legal Documentation</h3>
              <p className="text-muted-foreground">
                All our properties come with clean titles and complete legal documentation for your peace of mind.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Expertise</h3>
              <p className="text-muted-foreground">
                Decades of experience and deep local knowledge of the northern Pakistan property market.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated team is always available to answer your questions and provide guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
         <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">Featured Properties</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most exceptional land opportunities across northern Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No featured properties available at the moment.</p>
              </div>
            ) : (
              featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} featured={true} />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/allProperty">
                View All Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Explore Regions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover properties across the most scenic locations in northern Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {regions.map((region) => (
              <div
                key={region._id}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card"
              >
                <img
                  src={region.imageSrc}
                  alt={region.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{region.title}</h3>
                  <p className="text-white text-opacity-90 mb-4 line-clamp-2">{region.description}</p>
                  <a
                    href={`/${region.slug}`}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
                  >
                    Explore&nbsp;
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-muted dark:from-background dark:to-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Discover Our Featured Cars
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the breathtaking landscapes of northern Pakistan with our luxury car rentals — comfort, class, and convenience all in one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCars.map((car) => (
              <Card key={car._id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video relative">
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-white dark:bg-muted/20">
                  <h3 className="text-2xl font-bold text-primary mb-2">{car.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{car.description}</p>
                  <div className="space-y-1 mb-6">
                    <p className="text-lg font-semibold text-foreground">
                      PKR {car.pricePerDay.toLocaleString()} <span className="text-sm text-muted-foreground">/ day</span>
                    </p>
                    <p className="text-sm text-foreground">
                      🚗 {car.withDriver ? "Driver Included" : "Self Drive Available"}
                    </p>
                    <p className="text-sm text-foreground">
                      ⛽ {car.fuelIncluded ? "Fuel Included" : "Fuel Not Included"}
                    </p>
                    {!car.isAvailable && (
                      <p className="text-sm text-red-500 font-medium">Currently Unavailable</p>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/rent-a-car/${car._id}`}>View Details</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl">
              <Link href="/rent-a-car">Browse All Cars</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and discover the perfect land opportunity.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+923468824466">
                <PhoneCall className="mr-2 h-5 w-5" />
                Call: 0346882446
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}