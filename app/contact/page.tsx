import React from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'
import ContactForm from '@/components/ui/ContactForm'

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team to discuss your land and property requirements in northern Pakistan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">+923469750335</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office Address</h3>
                    <p className="text-muted-foreground">Main Office, Karimabad</p>
                    <p className="text-muted-foreground">Hunza Valley, Gilgit-Baltistan</p>
                    <p className="text-muted-foreground">Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-md">
                <h3 className="text-sm font-medium mb-2">WhatsApp Contact</h3>
                <p className="text-sm text-muted-foreground">
                  For quick responses, contact us via WhatsApp at +923469750335
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden h-96 shadow-md">
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
  )
}