"use client"

import React, { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  images: string[];
}

export default function HeroSection({ 
  title, 
  subtitle, 
  buttonText = "Explore Properties", 
  buttonLink = "/hunza",
  images 
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [images.length])
  
  return (
    <div className="relative h-[80vh] min-h-[500px] w-full overflow-hidden">
      {/* Image Slider */}
      {images.map((image, index) => (
        <div 
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 bg-cover bg-center bg-no-repeat",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10 container mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 max-w-4xl">
          {title}
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl">
          {subtitle}
        </p>
        <Button size="lg" asChild className="text-white bg-primary hover:bg-primary/90 shadow-lg">
          <a href={buttonLink}>
            {buttonText}
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      
      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}