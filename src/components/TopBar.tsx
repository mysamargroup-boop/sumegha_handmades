"use client";

import { Truck, Sparkles, Heart } from 'lucide-react';

export function TopBar() {
  const items = [
    { icon: Truck, text: "Free Shipping on Orders Over ₹999" },
    { icon: Sparkles, text: "100% Handcrafted with Love" },
    { icon: Heart, text: "Sustainably Sourced Materials" }
  ];

  return (
    <div className="bg-[#181113] text-white py-2 px-4 overflow-hidden relative">
      <div className="flex items-center justify-center gap-8 md:gap-16 animate-in fade-in slide-in-from-top duration-500">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx} 
              className={`flex items-center gap-2 whitespace-nowrap ${idx !== 0 ? 'hidden sm:flex' : ''}`}
            >
              <Icon className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
