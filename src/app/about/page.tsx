"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, Heart, ShoppingBag, Sparkles, HandHeart, Leaf, Flower2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const journey = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started crafting small clay pieces from a tiny corner desk in my bedroom.",
      icon: Star
    },
    {
      year: "2021",
      title: "First Collection",
      description: "Launched the 'Blossom' collection which sold out in just a few days.",
      icon: Heart
    },
    {
      year: "2023",
      title: "Studio Opening",
      description: "Moved into a dedicated studio space to expand our creative vision.",
      icon: ShoppingBag
    }
  ];

  const philosophies = [
    {
      title: "100% Handmade",
      description: "Every single piece is shaped, painted, and finished by hand, ensuring unique character.",
      icon: HandHeart
    },
    {
      title: "Sustainably Sourced",
      description: "We use eco-friendly materials and packaging to minimize our footprint on the earth.",
      icon: Leaf
    },
    {
      title: "Made with Love",
      description: "Joy is baked into every creation, intended to bring a smile to whoever holds it.",
      icon: Flower2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1EB] to-[#FFDDE1] py-12 px-6">
      <div className="max-w-xl mx-auto space-y-16 pb-24">
        {/* Back Button */}
        <div className="flex justify-start">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white shadow-sm h-10 w-10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Artist Header Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image 
              src="https://picsum.photos/seed/sumegha-artist/400/400" 
              alt="Sumegha - The Artist" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-foreground tracking-tight">Sumegha</h1>
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Creator & Artist</p>
          </div>
          <p className="text-foreground/70 text-lg leading-relaxed italic max-w-sm px-4">
            "Every piece is a fragment of my imagination, crafted with patience and love to bring a touch of beauty into your everyday life."
          </p>
        </div>

        {/* Our Journey Section */}
        <div className="space-y-10">
          <h3 className="text-xl font-black text-foreground flex items-center gap-3 uppercase tracking-widest">
            <TrendingUp className="text-primary h-5 w-5" />
            Our Journey
          </h3>

          <div className="relative pl-12 space-y-12">
            {/* Timeline Line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-primary/20" />
            
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {/* Icon Circle */}
                  <div className="absolute -left-[44px] top-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center z-10 border-2 border-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-primary font-black text-sm">{item.year}</p>
                    <h4 className="text-lg font-black text-foreground leading-tight">{item.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 space-y-12">
          <h3 className="text-xl font-black text-foreground text-center flex items-center justify-center gap-3 uppercase tracking-widest">
            <Heart className="text-primary h-5 w-5 fill-primary/20" />
            Our Philosophy
          </h3>

          <div className="space-y-8">
            {philosophies.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-6 p-6 rounded-3xl bg-[#fdf2f2]/50 border border-primary/5 group transition-all hover:bg-white hover:shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-primary/10 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-2 pt-1">
                    <h4 className="text-md font-black text-foreground uppercase tracking-wider">{item.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
