"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, Heart, ShoppingBag, TrendingUp, Instagram, Sparkles, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import placeholderData from '@/lib/placeholder-images.json';

export default function AboutPage() {
  const journey = [
    {
      year: "2025",
      title: "The Awakening",
      description: "Sumegha Handmades was born from a small desk and a big dream to preserve traditional arts.",
      icon: Star
    },
    {
      year: "2026",
      title: "Spreading Joy",
      description: "Our first 100 homes reached. Each piece brought a new story of connection and warmth.",
      icon: Heart
    },
    {
      year: "Future",
      title: "Global Legacy",
      description: "Expanding our horizons to keep the heartbeat of handmade art alive worldwide.",
      icon: ShoppingBag
    }
  ];

  const instagramPosts = placeholderData.placeholderImages.filter(img => img.id.startsWith('insta-'));
  const artistPhoto = placeholderData.placeholderImages.find(img => img.id === 'artist-main')?.imageUrl;
  const processPhotos = placeholderData.placeholderImages.filter(img => img.id.startsWith('process-'));

  const signatureCreations = [
    "Bespoke Lippan Murals",
    "Custom Couple Name Plates",
    "Traditional Shubh Symbols",
    "Protective Nazar Battu Decor"
  ];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6">
      <div className="container-normal mx-auto space-y-12 pb-16 relative">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute left-0">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/50 shadow-sm h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">The Visionary</p>
            <h1 className="text-2xl lg:text-5xl font-black uppercase tracking-tighter text-foreground">Our Story</h1>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-40 h-40 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl">
            <Image 
              src={artistPhoto || ''} 
              alt="Sumegha - The Artist" 
              fill
              sizes="(max-width: 1023px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-6xl lg:text-8xl font-cursive text-primary lowercase tracking-tight drop-shadow-sm select-none">
              Sumegha
            </h2>
            <p className="text-foreground/50 font-black uppercase tracking-[0.3em] text-[10px]">Founder & Creative Soul</p>
          </div>
          <div className="max-w-2xl space-y-6">
            <p className="text-foreground/80 text-base lg:text-xl leading-relaxed italic font-light">
              "Sumegha Handmades is more than just a brand; it's a heartbeat. It started from a simple desire to preserve the warmth of human touch in an increasingly digital world. Every piece I craft carries a fragment of my soul and a whisper of tradition."
            </p>
            <p className="text-foreground/70 text-sm lg:text-base leading-relaxed font-medium">
              We specialize in creating artifacts that aren't just decor, but anchors for your memories. From the rhythmic placement of mirrors in Lippan art to the personalized stroke of a nameplate, our work is a celebration of patience, precision, and the beautiful imperfections of the handmade process.
            </p>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-10 pt-8">
          <div className="text-center space-y-2">
            <TrendingUp className="text-primary h-6 w-6 mx-auto opacity-30" />
            <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">The Evolution</h3>
          </div>

          <div className="relative max-w-lg mx-auto pl-10 space-y-10">
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-primary/10" />
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="absolute -left-[32px] top-0 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center z-10 border border-primary/10">
                    <Icon className="h-3 w-3 text-primary" />
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <p className="text-primary font-black text-[10px] tracking-[0.2em]">{item.year}</p>
                    <h4 className="text-lg font-black text-foreground uppercase tracking-tight">{item.title}</h4>
                    <p className="text-foreground/70 text-xs leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Signature Creations */}
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] border border-primary/10 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-primary">
            <Palette className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Signature Creations</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {signatureCreations.map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-white/80 rounded-xl shadow-sm border border-primary/5">
                <Sparkles className="h-3 w-3 text-primary shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-tight text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Process Section */}
        <div className="pt-12 space-y-10">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Instagram className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Behind the Scenes</span>
            </div>
            <h3 className="text-2xl lg:text-4xl font-black uppercase tracking-tight">Witness the Craft</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(processPhotos.length > 0 ? processPhotos : instagramPosts.slice(0, 4)).map((img, i) => (
              <div key={i} className="relative aspect-square rounded-[1.5rem] overflow-hidden shadow-lg group border-2 border-white">
                <Image 
                  src={img.imageUrl} 
                  alt={img.description} 
                  fill
                  sizes="(max-width: 767px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Link href="https://instagram.com/sumegha_handmades" target="_blank">
              <Button className="rounded-xl h-14 px-10 text-[10px] font-bold uppercase tracking-[0.2em] gradient-primary shadow-xl shadow-primary/20 transition-all hover:scale-105">
                Explore Studio on Instagram
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
