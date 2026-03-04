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
    { name: 'Blog', href: '/blog' },
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
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center group">
              <h2 className="text-foreground text-2xl lg:text-4xl font-display font-black leading-tight tracking-[0.2em] uppercase transition-colors group-hover:text-primary text-center">
                Sumegha
              </h2>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex justify-end items-center gap-2 md:gap-6">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-12 w-12 transition-transform hover:scale-110">
                <Heart className="h-6 w-6" />
                {wishlist.length > 0 && (
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-12 w-12 transition-transform hover:scale-110">
                <ShoppingBag className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white border-2 border-white">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Bottom Row: Centered Menu */}
        <nav className="hidden lg:flex items-center justify-center space-x-12 mt-6 pt-4 border-t border-gray-50">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/60 hover:text-primary transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all group-hover:w-full"></span>
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
                className="text-sm font-bold uppercase tracking-[0.3em] text-foreground hover:text-primary transition-all"
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
