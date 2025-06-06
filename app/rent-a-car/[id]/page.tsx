"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Square, Wallet, ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'


export default function carDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [car, setCar] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { id } = params

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`)
        if (!response.ok) {
          throw new Error('Car not found')
        }
        const data = await response.json()
        setCar(data)
      } catch (error) {
        console.error('Error fetching car:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCar()
  }, [id])

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Skeleton */}
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-gray-200 dark:bg-gray-700 h-[400px] md:h-[500px] w-full mb-4" />
              <div className="flex space-x-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 rounded-md bg-gray-200 dark:bg-gray-700" />
                ))}
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              </div>
            </div>
            {/* Sidebar Skeleton */}
            <div>
              <div className="rounded-lg bg-gray-200 dark:bg-gray-700 h-96 w-full mb-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <p className="mb-6 text-muted-foreground">The car you are looking for does not exist or has been removed.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }


  const handleContact = () => {
    toast.success("Thank you for your interest! Our agent will contact you shortly.")
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to rent a car listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
              <Image
                src={car.images[currentImageIndex]}
                alt={`Car view ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {car.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                      }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {car.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden border-2 transition ${index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                >
                  <Image
                    src={image}
                    alt={`Car view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Car Description</h2>
              <p className="text-muted-foreground mb-6">{car.description}</p>

              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-8">
                {car.features && car.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-3">Location Information</h3>
              <p className="text-muted-foreground mb-4">
                This car is located in a prime area of {car.location}, offering convenient access to local amenities and attractions.
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Terms &amp; Conditions</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-primary">Fuel Policy:</span> Customers are responsible for their own fuel consumption. Each car is provided with a specific level of fuel, and the vehicle must be returned with the same fuel level. If the fuel level differs, the customer will be charged for the fuel difference, plus a PKR 500 service charge.
                  </li>
                  <li>
                    <span className="font-medium text-primary">Accident Responsibility:</span> In case of any accident while driving without a company-provided driver, the customer will be fully responsible for all damages and liabilities.
                  </li>
                  <li>
                    <span className="font-medium text-primary">Booking &amp; Payment:</span> Advance booking is required. Full payment must be made before the start of the rental period.
                  </li>
                  <li>
                    <span className="font-medium text-primary">Identification:</span> Customers must provide a valid CNIC or passport and a valid driving license (for self-drive rentals).
                  </li>
                  <li>
                    <span className="font-medium text-primary">Late Return:</span> Late return of the vehicle will incur additional charges as per the daily rate.
                  </li>
                  <li>
                    <span className="font-medium text-primary">Cleanliness:</span> Vehicles must be returned in clean condition. Excessive dirt may result in a cleaning fee.
                  </li>
                  <li>
                    <span className="font-medium text-primary">Prohibited Use:</span> The vehicle must not be used for illegal activities or driven outside permitted regions without prior approval.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Property Details Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{car.title}</h1>

                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm">{car.location}</span>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Wallet className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Price/Day</span>
                    </div>
                    <span className="font-semibold">
                      PKR {car.pricePerDay?.toLocaleString()} / day
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Available</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${car.isAvailable
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                      {car.isAvailable ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">With Driver</span>
                    </div>
                    <span>{car.withDriver ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Fuel Included</span>
                    </div>
                    <span>{car.fuelIncluded ? 'Yes' : 'No'}</span>
                  </div>
                  {car.isFeatured && (
                    <div className="flex items-center">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-6">
                  <Button
                    className="w-full"
                    onClick={handleContact}
                  >
                    Contact Agent
                  </Button>
                  <Button
                    className="w-full flex items-center justify-center gap-2 font-semibold"
                    style={{
                      backgroundColor: car.isAvailable ? '#25D366' : undefined,
                      color: car.isAvailable ? 'white' : undefined,
                      opacity: car.isAvailable ? 1 : 0.6,
                      cursor: car.isAvailable ? 'pointer' : 'not-allowed',
                    }}
                    disabled={!car.isAvailable}
                    onClick={() =>
                      window.open(
                        'https://wa.me/923468824466?text=I%20am%20interested%20in%20renting%20this%20car:%20' + car.title,
                        '_blank'
                      )
                    }
                  >
                    {/* WhatsApp SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      <path
                        d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.385L4 29l7.828-2.049C13.416 27.168 14.684 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.168 0-2.312-.168-3.393-.496l-.242-.072-4.393 1.15 1.176-4.285-.158-.244C7.168 19.312 7 18.168 7 17c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.293-7.707c-.293-.293-.768-.293-1.061 0l-1.293 1.293c-.293.293-.293.768 0 1.061.293.293.768.293 1.061 0l1.293-1.293c.293-.293.293-.768 0-1.061zm-7.586 0c-.293.293-.293.768 0 1.061l1.293 1.293c.293.293.768.293 1.061 0 .293-.293.293-.768 0-1.061l-1.293-1.293c-.293-.293-.768-.293-1.061 0z"
                        fill="#fff"
                      />
                    </svg>
                    Book Now
                  </Button>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Phone:</span> 03468824466
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> info@hunzaland.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}