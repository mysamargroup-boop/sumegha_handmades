
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, PanelsTopLeft, MousePointer2, Truck, Gem, ArrowRight, Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { cn } from "@/lib/utils";

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

export default function Home() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const SLIDE_DURATION = 5000;

  const plugin = React.useRef(
    Autoplay({ delay: SLIDE_DURATION, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + (100 / (SLIDE_DURATION / 100))));
    }, 100);
    return () => clearInterval(interval);
  }, [api, current]);

  const heroSlides = [
    {
      badge: "HANDMADE ELEGANCE",
      title: "BESPOKE",
      highlight: "ARTISTRY",
      desc: "Experience contemporary design through bespoke handmade elegance. Every piece is a testament to sophisticated simplicity.",
      image: "https://picsum.photos/seed/art-bg/1920/1080",
    },
    {
      badge: "PERSONALIZED FOR YOU",
      title: "BESPOKE",
      highlight: "JEWELRY",
      desc: "Each piece is meticulously handcrafted, ensuring no two items are exactly alike.",
      image: "https://picsum.photos/seed/jewelry-bg/1920/1080",
    },
    {
      badge: "ARTISANAL SOUL",
      title: "CRAFTED",
      highlight: "WITH LOVE",
      desc: "Discover unique, heartfelt creations from traditional pottery to modern paintings.",
      image: "https://picsum.photos/seed/craft-bg/1920/1080",
    }
  ];

  const featuredProducts = [
    { id: "lippan-1", name: "Vibrant Lippan Art", description: "Traditional mirror work handcrafted.", price: 1299, originalPrice: 1999, imageUrl: "https://picsum.photos/seed/art1/600/600", category: "Home Decor", tags: ['Bestseller'] },
    { id: "nameplate-1", name: "Custom Nameplates", description: "Elegant personalized ceramic nameplates.", price: 1599, originalPrice: 2200, imageUrl: "https://picsum.photos/seed/name1/600/600", category: "Festive Gifts", tags: ['New Arrival'] },
    { id: "folk-art-1", name: "Indian Folk Art", description: "Authentic traditional patterns.", price: 899, originalPrice: 1200, imageUrl: "https://picsum.photos/seed/folk1/600/600", category: "Wedding", tags: ['Bestseller'] },
    { id: "festive-decor-1", name: "Festive Decor", description: "Handcrafted ornaments for every occasion.", price: 650, originalPrice: 950, imageUrl: "https://picsum.photos/seed/decor1/600/600", category: "Diwali Decor", tags: ['Trending'] }
  ];

  const categories = [
    { name: "Festive / Special Gifts", image: "https://picsum.photos/seed/cat-gifts/400/400" },
    { name: "Home Decor", image: "https://picsum.photos/seed/cat-decor/400/400" },
    { name: "Wedding", image: "https://picsum.photos/seed/cat-wedding/400/400" },
    { name: "Diwali decor", image: "https://picsum.photos/seed/cat-diwali/400/400" },
    { name: "Anniversary", image: "https://picsum.photos/seed/cat-anniversary/400/400" }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Slider Section */}
      <section className="relative w-full px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
        <Carousel 
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative pl-0">
                <div className="relative h-[60vh] sm:h-[75vh] min-h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-black/5 border border-white/20">
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover opacity-30"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/80" />
                  </div>
                  <div className="relative z-10 h-full flex items-center justify-center p-6 sm:p-12">
                    <div className="container-normal flex flex-col items-center text-center space-y-6 sm:space-y-8">
                      <div className="inline-block px-4 py-1 rounded-full border border-primary/20 text-[9px] font-bold uppercase tracking-[0.4em] text-primary bg-white/40 backdrop-blur-md">
                        {slide.badge}
                      </div>
                      <div className="space-y-1">
                        <h1 className="text-3xl sm:text-6xl lg:text-8xl font-black leading-none uppercase tracking-tighter text-foreground">
                          {slide.title}
                        </h1>
                        <h2 className="text-3xl sm:text-6xl lg:text-8xl font-black leading-none uppercase tracking-tighter text-primary">
                          {slide.highlight}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-lg lg:text-xl text-foreground/70 font-light max-w-xl mx-auto leading-relaxed">
                        {slide.desc}
                      </p>
                      <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto pt-4">
                        <Link href="/products" className="w-full">
                          <Button className="w-full h-12 lg:h-14 px-10 rounded-2xl text-[10px] font-bold uppercase tracking-widest gradient-primary">
                            View Collection
                          </Button>
                        </Link>
                        <Button 
                          variant="secondary" 
                          className="w-full h-12 lg:h-14 px-10 rounded-2xl text-[10px] font-bold uppercase tracking-widest bg-white/80 backdrop-blur-sm border border-white shadow-sm flex items-center justify-center gap-2 group hover:bg-white"
                          onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                        >
                          <WhatsAppIcon className="h-4 w-4 text-green-600" />
                          WhatsApp Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className="relative h-1 w-8 sm:w-12 bg-primary/10 rounded-full overflow-hidden transition-all duration-300"
                onClick={() => api?.scrollTo(i)}
              >
                {current === i && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </Carousel>
      </section>

      {/* Collections Slider */}
      <section className="py-10 bg-white/40 border-b border-white">
        <div className="container-normal">
          <div className="flex flex-col items-center text-center gap-2 mb-8">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Browse By</h4>
            <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight">Explore Collections</h2>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3 sm:-ml-4">
              {categories.map((cat, index) => (
                <CarouselItem key={index} className="pl-3 sm:pl-4 basis-[45%] sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <Link href={`/products?category=${cat.name}`} className="group block text-center space-y-3">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30">
                      <Image 
                        src={cat.image} 
                        alt={cat.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                    <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-foreground/60 group-hover:text-primary">
                      {cat.name}
                    </span>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Featured Works Grid */}
      <section className="py-12">
        <div className="container-normal">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-4 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Artisanal Gallery</h4>
              <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight text-foreground">Featured Works</h2>
            </div>
            <Link href="/products" className="text-foreground text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 border-primary/20 pb-1 hover:border-primary">
              See All Gallery
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 bg-white/40 border-y border-white">
        <div className="container-normal">
          <div className="bg-white p-8 lg:p-20 rounded-[3rem] shadow-xl text-center border border-primary/5 space-y-6">
            <PanelsTopLeft className="h-6 w-6 text-primary/40 mx-auto" />
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">The Art Philosophy</h4>
            <p className="text-foreground/80 text-lg md:text-3xl leading-relaxed font-light italic max-w-4xl mx-auto">
              "Rooted in contemporary aesthetics and traditional soul, we believe in the power of handmade elements to transform spaces into personal sanctuaries of elegance."
            </p>
            <div className="w-12 h-[1.5px] bg-primary/30 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 lg:py-24">
        <div className="container-normal">
          <h4 className="text-[12px] font-bold text-center mb-12 uppercase tracking-[0.5em] text-primary">The Experience</h4>
          <div className="grid grid-cols-3 gap-3 sm:gap-24">
            {[
              { title: "CURATE", desc: "Select from our gallery of creations.", icon: MousePointer2 },
              { title: "CONNECT", desc: "Direct consultation via WhatsApp.", icon: WhatsAppIcon },
              { title: "CHERISH", desc: "Bespoke delivery for you.", icon: Truck }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-4 lg:space-y-6 group">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-[1.5rem] lg:rounded-[2rem] bg-white shadow-xl shadow-primary/5 border border-primary/5 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">
                    <Icon className="h-5 w-5 sm:h-10 sm:w-10 md:h-14 md:w-14 text-primary stroke-[1.5px]" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-black text-[10px] sm:text-base md:text-xl uppercase tracking-[0.1em] text-foreground">{step.title}</h5>
                    <p className="text-foreground/50 text-[7px] sm:text-[10px] md:text-xs font-light leading-relaxed max-w-[120px] mx-auto">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-12 lg:py-20">
        <div className="container-normal">
          <div className="bg-[#181113] text-white p-10 lg:p-24 rounded-[3.5rem] text-center space-y-6 lg:space-y-8 relative overflow-hidden shadow-2xl">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-bold uppercase tracking-[0.4em] text-white">
                AI Powered Concierge
              </div>
              <h3 className="text-2xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">Your Personal Art Curator</h3>
              <p className="text-white/60 text-xs lg:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                Not sure which piece fits your aesthetic? Our AI Assistant can curate a selection based on your unique style and space.
              </p>
            </div>
            <Link href="/discovery" className="inline-block pt-2">
              <Button className="h-14 lg:h-16 px-10 rounded-2xl text-[11px] font-bold uppercase tracking-widest gradient-primary border-none text-white shadow-2xl shadow-primary/30">
                Start Discovery
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
