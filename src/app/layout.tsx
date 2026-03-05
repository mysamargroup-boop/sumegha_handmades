import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Sumegha Handmades | Crafted With Love',
  description: 'Unique, heartfelt handmade creations from jewelry to custom portraits.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
