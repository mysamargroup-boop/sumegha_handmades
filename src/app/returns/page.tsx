"use client";

import Link from 'next/link';
import { ArrowLeft, RefreshCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReturnsPage() {
  const policies = [
    {
      title: "Damaged Items",
      icon: AlertCircle,
      content: "Since our products are fragile handmade art, we take extreme care in packaging. If your item arrives damaged, please share an unboxing video within 24 hours of delivery via WhatsApp to claim a replacement."
    },
    {
      title: "Refund Process",
      icon: RefreshCcw,
      content: "Refunds are only issued if a replacement for a damaged item is unavailable. Approved refunds are processed within 5-7 business days to your original payment method."
    },
    {
      title: "Non-Returnable Items",
      icon: CheckCircle2,
      content: "Customized name plates and personalized gifts are non-returnable and non-refundable unless received in a damaged condition. Slight artistic variations are expected in handmade products."
    }
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24 px-4">
      <div className="container-normal mx-auto max-w-4xl space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/">
            <Button variant="ghost" className="rounded-full mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
          <div className="p-4 bg-primary/10 rounded-full">
            <RefreshCcw className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl lg:text-6xl font-black uppercase tracking-tight text-foreground">Return & Refunds</h1>
          <p className="text-foreground/50 text-sm font-light uppercase tracking-widest text-center">We value your satisfaction and the integrity of our art.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
            return (
              <div key={idx} className="bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-primary/5 shadow-sm space-y-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground">{policy.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed font-light">{policy.content}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#181113] p-12 rounded-[4rem] text-center space-y-6">
          <h3 className="text-2xl font-black uppercase tracking-widest text-white">Need Assistance?</h3>
          <p className="text-white/60 max-w-lg mx-auto font-light">Our artist is here to help you with any concerns regarding your order or the crafting process.</p>
          <Link href="/contact">
            <Button className="h-14 px-10 rounded-2xl gradient-primary text-[10px] font-bold uppercase tracking-widest">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
