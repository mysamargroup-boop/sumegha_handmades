
"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist } = useStore();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/products' },
    { name: 'AI Assistant', href: '/discovery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black font-headline tracking-tighter text-gradient">SUMEGHA</span>
          <span className="hidden sm:inline-block font-medium text-xs tracking-widest text-muted-foreground uppercase">Handmades</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 gradient-primary">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium p-2 hover:bg-secondary rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 p-2">
                <Heart className="h-5 w-5" />
                <span>Wishlist ({wishlist.length})</span>
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 p-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cart.length})</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
