"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ContactFloat() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const openWhatsApp = () => {
    window.open('https://wa.me/923468824466?text=I%20am%20interested%20in%20land%20for%20sale', '_blank')
  }
  
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 transition-all duration-300 transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
    )}>
      <div className="flex flex-col items-end space-y-3">
        <Button 
          onClick={openWhatsApp}
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">WhatsApp Contact</span>
        </Button>
        
        <Button
          as="a"
          href="tel:+923468824466"
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <Phone className="h-6 w-6" />
          <span className="sr-only">Call Now</span>
        </Button>
      </div>
    </div>
  )
}