"use client";

import Link from 'next/link';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist } = useStore();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/products' },
    { name: 'Our Story', href: '/about' },
    { name: 'AI Concierge', href: '/discovery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container-normal py-4">
        {/* Top Row: Logo & Icons */}
        <div className="grid grid-cols-3 items-center w-full">
          {/* Mobile/Tablet Hamburger */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-black/5 text-foreground lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center group">
              <h2 className="text-foreground text-xl lg:text-3xl font-display font-black leading-tight tracking-[0.2em] uppercase transition-colors group-hover:text-primary text-center">
                Sumegha
              </h2>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex justify-end items-center gap-1 md:gap-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-10 w-10 transition-transform hover:scale-110">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-white border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-10 w-10 transition-transform hover:scale-110">
                <ShoppingBag className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-white border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Bottom Row: Centered Menu */}
        <nav className="hidden lg:flex items-center justify-center space-x-12 mt-4 pt-2 border-t border-gray-50">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60 hover:text-primary transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile/Tablet Nav Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-8 animate-in slide-in-from-top duration-300 lg:hidden shadow-2xl z-50">
          <nav className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.3em] text-foreground hover:text-primary transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
