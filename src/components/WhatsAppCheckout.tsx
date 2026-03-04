
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CartItem } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCheckoutProps {
  items: CartItem[];
  total: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function WhatsAppCheckout({ items, total, open, onOpenChange, onSuccess }: WhatsAppCheckoutProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    const phone = "919876543210"; // Replace with actual business number
    const itemDetails = items.map(item => `- ${item.name} (Qty: ${item.quantity}, Price: ₹${item.price * item.quantity})`).join('\n');
    const message = `*New Order from Sumegha Handmades*\n\n` +
      `*Customer Name:* ${name}\n` +
      `*Address:* ${address}\n\n` +
      `*Order Details:*\n${itemDetails}\n\n` +
      `*Total Order Value:* ₹${total}\n\n` +
      `Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Confirm Your Order</DialogTitle>
          <DialogDescription>
            We'll take your order details and redirect you to WhatsApp to finalize with our artist.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full delivery address" className="rounded-xl min-h-[100px]" />
          </div>
          <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10">
            <p className="text-sm font-semibold mb-2">Order Summary ({items.length} items)</p>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Payable:</span>
              <span className="text-primary font-headline">₹{total}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            className="w-full h-12 rounded-full gradient-primary text-lg" 
            onClick={handleCheckout}
            disabled={!name || !address}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Send via WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
