"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Square, Wallet, ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Property } from '@/lib/properties'

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  useEffect(() => {
    async function fetchProperty() {
      try {
        const response = await fetch(`/api/properties/${params.id}`)
        if (!response.ok) throw new Error('Property not found')
        const data = await response.json()
        setProperty(data)
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProperty()
  }, [params.id])
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }
  
  if (!property) {
    return (
      <div className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="mb-6 text-muted-foreground">The property you are looking for does not exist or has been removed.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }
  
  const handleContact = () => {
    toast.success("Thank you for your interest! Our agent will contact you shortly.")
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
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
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden border-2 transition ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Property view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Property Description</h2>
              <p className="text-muted-foreground mb-6">{property.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-8">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Location Information</h3>
              <p className="text-muted-foreground mb-4">
                This property is located in a prime area of {property.location}, offering convenient access to local amenities and attractions.
              </p>
              
              <div className="rounded-lg overflow-hidden h-64 mb-8">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12858.69012551308!2d74.59925061906857!3d36.32318040980828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e8a0c36eb73e95%3A0xfa7bba9ced975e2d!2sHunza!5e0!3m2!1sen!2s!4v1620812345678!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Property Details Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Square className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Area</span>
                    </div>
                    <span>{property.area}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Wallet className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Price</span>
                    </div>
                    <span className="font-semibold">{property.price}</span>
                  </div>
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
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://wa.me/923468824466?text=I%20am%20interested%20in%20this%20property:%20' + property.title, '_blank')}
                  >
                    WhatsApp Inquiry
                  </Button>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Phone:</span> 0346882446
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