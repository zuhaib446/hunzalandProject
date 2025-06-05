import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Facebook, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Hunza Real Estate
            </h3>
            <p className="text-primary-foreground/90 mb-4">
              Providing premium land opportunities in the beautiful northern regions of Pakistan including Hunza, Gilgit, Naltar, and more.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-primary-foreground hover:text-primary-foreground/80 transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground hover:text-primary-foreground/80 transition">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Areas We Cover</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hunza" className="text-primary-foreground/90 hover:text-primary-foreground transition">
                  Hunza Valley
                </Link>
              </li>
              <li>
                <Link href="/gilgit" className="text-primary-foreground/90 hover:text-primary-foreground transition">
                  Gilgit City
                </Link>
              </li>
              <li>
                <Link href="/naltar" className="text-primary-foreground/90 hover:text-primary-foreground transition">
                  Naltar Valley
                </Link>
              </li>
              <li>
                <Link href="/sost-dry-port" className="text-primary-foreground/90 hover:text-primary-foreground transition">
                  Sost Dry Port
                </Link>
              </li>
              <li>
                <Link href="/attabad-lake" className="text-primary-foreground/90 hover:text-primary-foreground transition">
                  Attabad Lake
                </Link>
              </li>
              <li>
                <Link href="/skardu" className="text-primary-foreground/90 hover:text-primary-foreground transition">
                  Skardu land for sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-primary-foreground/90">+923469750335</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span className="text-primary-foreground/90">Main Office, Hunza Valley, Gilgit-Baltistan, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-primary-foreground/80">
          <p>© {new Date().getFullYear()} Hunza Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}