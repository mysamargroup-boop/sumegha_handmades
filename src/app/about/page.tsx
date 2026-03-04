"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, Heart, Star, ShoppingBag, Sparkles, Flower2, Leaf, HandHeart, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const journey = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started crafting small clay pieces and handpainted miniatures from a tiny corner desk in my bedroom.",
      icon: Star
    },
    {
      year: "2021",
      title: "First Collection",
      description: "Launched the 'Petals & Paint' tote series, which connected me with our first 100 art lovers.",
      icon: Heart
    },
    {
      year: "2023",
      title: "Studio Opening",
      description: "Opened our official Sumegha Handmades studio to bring custom jewelry and portraits to life.",
      icon: ShoppingBag
    }
  ];

  const philosophies = [
    {
      title: "100% Handmade",
      description: "Every single piece is shaped, painted, and finished by hand, ensuring unique character and soul.",
      icon: HandHeart
    },
    {
      title: "Eco-Conscious",
      description: "We prioritize sustainable materials and plastic-free packaging for a gentler touch on nature.",
      icon: Leaf
    },
    {
      title: "Made with Love",
      description: "Joy is infused into every creation, intended to bring a smile to whoever holds it.",
      icon: Flower2
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white shadow-sm">
              <ArrowLeft className="h-6 w-6 text-secondary" />
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-secondary">Our Story</h1>
          <div className="w-10" />
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <Image 
              src="https://picsum.photos/seed/sumegha/800/1000" 
              alt="Sumegha - The Artist" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary">Sumegha</h2>
              <p className="text-primary font-bold text-xl uppercase tracking-[0.2em]">Creator & Artist</p>
            </div>
            
            <p className="text-secondary/70 text-xl leading-relaxed italic">
              "Art has always been my sanctuary. Sumegha Handmades is my way of sharing that peace with the world, one handcrafted detail at a time."
            </p>
            
            <div className="p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 space-y-4">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Sparkles className="text-primary h-5 w-5" />
                The Vision
              </h3>
              <p className="text-secondary/70 leading-relaxed">
                We believe that in a world of mass production, the human touch is what truly resonates. Every piece we create is a fragment of imagination, patiently brought to life to transform your everyday spaces into personal galleries of elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mb-32">
          <div className="flex items-center gap-3 justify-center mb-16">
            <TrendingUp className="text-primary h-8 w-8" />
            <h3 className="text-4xl font-serif font-bold text-secondary text-center">The Journey</h3>
          </div>

          <div className="relative space-y-20 max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 bg-primary/10 hidden md:block" />
            
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row gap-8 items-center md:items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-end px-4 text-center md:text-right">
                    <div className={isEven ? '' : 'md:text-left md:items-start flex flex-col'}>
                      <p className="text-primary font-black text-2xl mb-1">{item.year}</p>
                      <h4 className="text-2xl font-serif font-bold text-secondary mb-3">{item.title}</h4>
                      <p className="text-secondary/60 text-lg leading-relaxed max-w-md">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center z-10 scale-110">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[4rem] p-12 md:p-20 shadow-2xl border border-white/50 mb-16 text-center">
          <h3 className="text-4xl font-serif font-bold text-secondary mb-16">The Philosophy</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {philosophies.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center mx-auto scale-110">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold text-secondary">{item.title}</h4>
                  <p className="text-secondary/60 text-lg leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}