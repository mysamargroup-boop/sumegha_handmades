
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { WhatsAppCheckout } from '@/components/WhatsAppCheckout';
import { toast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-black mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Looks like you haven't added any handmade treasures yet. Let's find something beautiful!</p>
        <Link href="/products">
          <Button size="lg" className="rounded-full gradient-primary px-10">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl lg:text-6xl font-black font-headline mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-primary/5">
              <div className="relative w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-headline font-bold mb-1">{item.name}</h3>
                <p className="text-primary font-bold mb-4">₹{item.price}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <div className="flex items-center border rounded-full px-2 py-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateCartQuantity(item.id, -1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateCartQuantity(item.id, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/5 rounded-full" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                <p className="text-xl font-bold font-headline">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-primary/10 sticky top-24">
            <h2 className="text-2xl font-headline font-black mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-muted-foreground">
                <span>Items Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-xl font-bold font-headline">Grand Total</span>
                <span className="text-2xl font-black font-headline text-primary">₹{total}</span>
              </div>
            </div>
            
            <Button 
              className="w-full h-16 rounded-full gradient-primary text-xl font-bold shadow-lg shadow-primary/20 group"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout on WhatsApp
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="mt-6 text-xs text-center text-muted-foreground leading-relaxed">
              Secure checkout via WhatsApp. We will contact you for payment details (UPI/Bank Transfer/Cash on Delivery) once the artist confirms the order.
            </p>
          </div>
        </div>
      </div>

      <WhatsAppCheckout 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
        items={cart} 
        total={total} 
        onSuccess={() => {
          clearCart();
          toast({ title: "Order sent to WhatsApp!", description: "Check your phone to complete the chat." });
        }}
      />
    </div>
  );
}
