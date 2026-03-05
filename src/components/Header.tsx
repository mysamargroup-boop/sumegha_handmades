
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Menu, X, Home, Shapes, Info, Phone, Gem, BookText, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cart, wishlist, removeFromCart, updateCartQuantity } = useStore();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Collections', href: '/collections', icon: Shapes },
    { name: 'Gallery', href: '/products', icon: Shapes },
    { name: 'Our Story', href: '/about', icon: Info },
    { name: 'Blog', href: '/blog', icon: BookText },
    { name: 'AI Concierge', href: '/discovery', icon: Gem },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const subtotal = cart.reduce((sum, item) => sum + (item.sale_price * item.quantity), 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container-normal py-2 lg:py-3">
        {/* Main Header Row - 3 Column Grid for perfect alignment */}
        <div className="grid grid-cols-3 items-center w-full">
          {/* Left: Hamburger Button */}
          <div className="flex items-center justify-start">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-black/5 text-foreground lg:hidden h-10 w-10 -ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Center: Logo Image */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 lg:h-12 w-72 lg:w-96">
                <Image 
                  src="/logo.png" 
                  alt="Sumegha Handmades" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex justify-end items-center gap-1 -mr-2">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-10 w-10 sm:h-12 sm:w-12 transition-transform hover:scale-110">
                <Heart className="h-7 w-7 sm:h-9 sm:w-9" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-10 w-10 sm:h-12 sm:w-12 transition-transform hover:scale-110">
                  <ShoppingBag className="h-7 w-7 sm:h-9 sm:w-9" />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white border-2 border-white">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md p-0 rounded-l-[2rem] border-none shadow-2xl flex flex-col">
                <SheetHeader className="p-6 pb-2">
                  <SheetTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    Shopping Bag
                  </SheetTitle>
                </SheetHeader>
                
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-10 w-10 text-primary/30" />
                    </div>
                    <p className="text-sm text-muted-foreground font-light max-w-[200px]">Your bag is empty. Let's add some art!</p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="flex-1 px-6">
                      <div className="space-y-6 py-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 group">
                            <div className="relative h-24 w-20 rounded-xl overflow-hidden border border-primary/5 shrink-0">
                              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div className="space-y-1">
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="text-xs font-black uppercase tracking-tight leading-tight line-clamp-2">{item.name}</h4>
                                  <button onClick={() => removeFromCart(item.id)} className="text-destructive/40 hover:text-destructive transition-colors">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-sm font-black text-primary">₹{item.sale_price}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center bg-primary/5 rounded-full p-0.5 border border-primary/10">
                                  <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-full transition-colors"><Minus className="h-3 w-3" /></button>
                                  <span className="w-6 text-center text-[10px] font-black">{item.quantity}</span>
                                  <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-full transition-colors"><Plus className="h-3 w-3" /></button>
                                </div>
                                <span className="text-[10px] font-black text-foreground/40">₹{item.sale_price * item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-6 bg-white border-t border-primary/5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground">
                        <span>Net Total</span>
                        <span className="text-xl text-primary">₹{subtotal}</span>
                      </div>
                      <Link href="/cart" className="block w-full">
                        <Button className="w-full h-14 rounded-xl gradient-primary text-[10px] font-bold uppercase tracking-widest group">
                          View Full Bag & Checkout
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-12 mt-4 pt-3 border-t border-gray-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative group",
                  isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[1.5px] bg-primary transition-all",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-8 animate-in slide-in-from-top duration-300 lg:hidden shadow-2xl z-50">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-[0.2em]",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5 text-foreground hover:text-primary"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "opacity-100" : "opacity-60")} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
