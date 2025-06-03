import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactFloat from '@/components/layout/ContactFloat';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hunzarealestate.com'),
  title: {
    default: 'Hunza Real Estate - Premium Properties & Land in Northern Pakistan',
    template: '%s | Hunza Real Estate'
  },
  description: 'Discover exclusive land and property opportunities in Hunza, Gilgit, and Northern Pakistan. Premium plots with stunning mountain views, commercial properties, and high-return investment options. Your trusted partner in Northern Pakistan real estate.',
  keywords: [
    'Hunza real estate',
    'property for sale Hunza',
    'Gilgit real estate',
    'Northern Pakistan property',
    'commercial plots Gilgit',
    'investment property Hunza',
    'mountain view plots',
    'land for sale Pakistan',
    'Hunza Valley property',
    'Karakoram property',
    'Pakistan northern areas real estate',
    'luxury property Hunza',
    'commercial property Gilgit',
    'residential plots Hunza',
    'property investment Northern Pakistan',
    'Hunza Land for Sale'
  ],
  authors: [{ name: 'Hunza Real Estate' }],
  creator: 'Hunza Real Estate',
  publisher: 'Hunza Real Estate',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: 'https://www.hunzarealestate.com'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hunzarealestate.com',
    siteName: 'Hunza Real Estate',
    title: 'Hunza Real Estate - Premium Properties in Northern Pakistan',
    description: 'Discover exclusive land and property opportunities in Hunza, Gilgit, and Northern Pakistan. Premium plots with stunning mountain views and high appreciation potential.',
    images: [
      {
        url: 'https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg',
        width: 1200,
        height: 630,
        alt: 'Hunza Valley Landscape',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hunza Real Estate - Premium Properties in Northern Pakistan',
    description: 'Discover exclusive land and property opportunities in Hunza, Gilgit, and Northern Pakistan.',
    images: ['https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'],
    creator: '@hunzarealestate',
    site: '@hunzarealestate',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.hunzarealestate.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="font-sans">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <ContactFloat />
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}