import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Sumegha Handmades | Crafted With Love',
  description: 'Unique, heartfelt handmade creations from jewelry to custom portraits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}