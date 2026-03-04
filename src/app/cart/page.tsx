"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { WhatsAppCheckout } from '@/components/WhatsAppCheckout';
import { toast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginal = cart.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalSavings = totalOriginal - subtotal;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl lg:text-6xl font-headline font-black mb-4 uppercase tracking-tight text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto font-light text-sm">Looks like you haven't added any handmade treasures yet. Let's find something beautiful!</p>
        <Link href="/products">
          <Button size="lg" className="rounded-full gradient-primary px-10 text-[10px] font-bold uppercase tracking-widest h-14">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pb-32 max-w-7xl">
      <div className="text-center mb-12 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Review Your Items</p>
        <h1 className="text-3xl lg:text-5xl font-black font-headline uppercase tracking-tight text-foreground">Shopping Bag</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-6 p-4 lg:p-6 bg-white/50 backdrop-blur-sm rounded-[2rem] shadow-sm border border-primary/5 transition-all hover:shadow-md hover:bg-white group">
              {/* Image Column */}
              <div className="relative w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-sm border border-primary/5">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>
              
              {/* Details Column */}
              <div className="flex-grow flex flex-col justify-between self-stretch py-1">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm lg:text-xl font-black uppercase tracking-tight text-foreground leading-tight line-clamp-2">
                      {item.name}
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive/40 hover:text-destructive hover:bg-destructive/5 rounded-full h-8 w-8 -mt-1 -mr-1" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg lg:text-2xl font-black text-primary">₹{item.price}</p>
                    {item.originalPrice && (
                      <p className="text-xs lg:text-sm text-muted-foreground line-through decoration-primary/40 font-bold">₹{item.originalPrice}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-primary/5 rounded-full p-1 border border-primary/10">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-white transition-colors" 
                      onClick={() => updateCartQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-white transition-colors" 
                      onClick={() => updateCartQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-foreground/40 hidden sm:block">
                    Total: ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-primary/10 sticky top-24 space-y-8">
            <h2 className="text-xl font-headline font-black uppercase tracking-tight text-foreground">Order Summary</h2>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <span>Items ({cart.length})</span>
                <span>₹{totalOriginal}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <span>Shipping</span>
                <span className="text-green-600 font-black">FREE</span>
              </div>
              
              {totalSavings > 0 && (
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl border border-green-100 animate-in fade-in zoom-in duration-500">
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center">
                    <Sparkles className="h-3 w-3 mr-2" />
                    Your Savings
                  </span>
                  <span className="font-black text-green-700 text-base">₹{totalSavings}</span>
                </div>
              )}

              <div className="pt-6 border-t border-primary/10 flex justify-between items-end">
                <span className="text-base font-black uppercase tracking-tight">Net Total</span>
                <div className="text-right">
                  <span className="block text-3xl font-black font-headline text-primary leading-none">₹{subtotal}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full h-16 rounded-2xl gradient-primary text-[10px] font-bold uppercase tracking-[0.25em] shadow-xl shadow-primary/20 group active:scale-[0.98] transition-all"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Checkout on WhatsApp
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-[8px] text-center text-muted-foreground leading-relaxed uppercase tracking-[0.2em] font-bold">
                Direct Contact with the Artist
              </p>
            </div>
            
            <div className="pt-2">
              <div className="flex justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 items-center">
                <Image src="https://picsum.photos/seed/pay1/40/24" alt="UPI" width={40} height={24} className="rounded-md" />
                <Image src="https://picsum.photos/seed/pay2/40/24" alt="Card" width={40} height={24} className="rounded-md" />
                <Image src="https://picsum.photos/seed/pay3/40/24" alt="COD" width={40} height={24} className="rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppCheckout 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
        items={cart} 
        total={subtotal} 
        onSuccess={() => {
          clearCart();
          toast({ title: "Order sent!", description: "Check WhatsApp to finalize with the artist." });
        }}
      />
    </div>
  );
}
