"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CartItem } from '@/lib/types';
import { MessageCircle, ShoppingBag } from 'lucide-react';

interface WhatsAppCheckoutProps {
  items: CartItem[];
  total: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function WhatsAppCheckout({ items, total, open, onOpenChange, onSuccess }: WhatsAppCheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckout = () => {
    const businessPhone = "919876543210"; // Actual business number
    const itemDetails = items.map(item => `- ${item.name} (Qty: ${item.quantity}, Price: ₹${item.price * item.quantity})`).join('\n');
    
    const message = `*New Order from Sumegha Handmades*\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `- Name: ${formData.name}\n` +
      `- Email: ${formData.email}\n` +
      `- Phone: ${formData.phone}\n` +
      `- Address: ${formData.address}\n` +
      `- Pincode: ${formData.pincode}\n\n` +
      `*ORDER SUMMARY:*\n${itemDetails}\n\n` +
      `*TOTAL VALUE:* ₹${total}\n\n` +
      (formData.note ? `*NOTE FOR ARTIST:* ${formData.note}\n\n` : '') +
      `Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${businessPhone}?text=${encodedMessage}`, '_blank');
    onSuccess();
    onOpenChange(false);
  };

  const isFormValid = formData.name && formData.email && formData.address && formData.pincode;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0 bg-background">
        <div className="bg-primary/5 p-6 border-b border-primary/10">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              Finalize Order
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-light text-xs uppercase tracking-widest mt-1">
              Complete your details to finish via WhatsApp
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Full Name *</Label>
              <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="rounded-xl border-primary/10 bg-white" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Phone Number</Label>
              <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." className="rounded-xl border-primary/10 bg-white" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Email Address *</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" className="rounded-xl border-primary/10 bg-white" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Delivery Address *</Label>
            <Textarea id="address" value={formData.address} onChange={handleChange} placeholder="Full home or office address" className="rounded-xl border-primary/10 bg-white min-h-[80px] resize-none" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pincode" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Pincode *</Label>
            <Input id="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit area code" className="rounded-xl border-primary/10 bg-white" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Note to Artist (Optional)</Label>
            <Textarea id="note" value={formData.note} onChange={handleChange} placeholder="Customization requests..." className="rounded-xl border-primary/10 bg-white min-h-[60px] resize-none" />
          </div>
        </div>

        <div className="p-6 bg-primary/5 border-t border-primary/10">
          <div className="flex justify-between items-end mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Total Amount</span>
            <span className="text-2xl font-black font-headline text-primary">₹{total}</span>
          </div>
          
          <Button 
            className="w-full h-14 rounded-2xl gradient-primary text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all hover:opacity-90 active:scale-[0.98]" 
            onClick={handleCheckout}
            disabled={!isFormValid}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Confirm on WhatsApp
          </Button>
          <p className="text-[8px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] font-bold">
            Redirects to secure artist chat
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
