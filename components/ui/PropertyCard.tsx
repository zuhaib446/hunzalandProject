"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Square, Wallet, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Property } from '@/lib/properties'

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const handleContactAgent = () => {
    window.location.href = `tel:+923468824466`;
    toast.success("Calling agent...");
  };

  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-lg ${
      featured ? 'border-primary/20' : ''
    }`}>
      <div className="relative h-48 md:h-64">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Square className="h-4 w-4 text-primary mr-1" />
            <span className="text-sm">{property.area}</span>
          </div>
          
          <div className="flex items-center">
            <Wallet className="h-4 w-4 text-primary mr-1" />
            <span className="text-sm font-medium">{property.price}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleContactAgent}
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Agent
          </Button>
          
          <Button asChild className="flex-1">
            <Link href={`/property/${property._id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}