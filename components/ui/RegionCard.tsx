"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface RegionCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

export default function RegionCard({
  title,
  description,
  imageSrc,
  href,
}: RegionCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <Button asChild className="w-full">
          <Link href={href}>
            View Properties
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}