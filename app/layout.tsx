import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactFloat from '@/components/layout/ContactFloat';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hunzaland.com'),
  title: {
    default: 'Hunza Land For Sale - Premium Properties in Northern Pakistan',
    template: '%s | Hunza Land For Sale'
  },
  description: 'Find exclusive land and property opportunities in Hunza, Gilgit, Naltar, Sost Dry Port, and Attabad Lake regions. Premium plots with mountain views and investment potential.',
  keywords: ['Hunza land', 'property for sale', 'Gilgit real estate', 'Naltar Valley plots', 'Sost Dry Port commercial property', 'Attabad Lake land', 'Pakistan northern areas property', 'mountain view plots', 'investment property Pakistan', 'commercial plots Gilgit'],
  authors: [{ name: 'Hunza Land For Sale' }],
  creator: 'Hunza Land For Sale',
  publisher: 'Hunza Land For Sale',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: 'https://www.hunzaland.com'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hunzaland.com',
    siteName: 'Hunza Land For Sale',
    title: 'Hunza Land For Sale - Premium Properties in Northern Pakistan',
    description: 'Discover exclusive land opportunities in Hunza, Gilgit, and surrounding regions with breathtaking mountain views and high appreciation potential.',
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
    title: 'Hunza Land For Sale - Premium Properties in Northern Pakistan',
    description: 'Discover exclusive land opportunities in Hunza, Gilgit, and surrounding regions.',
    images: ['https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg'],
    creator: '@hunzaland',
    site: '@hunzaland',
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
        <link rel="canonical" href="https://www.hunzaland.com" />
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