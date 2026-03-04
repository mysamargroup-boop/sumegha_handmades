"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Truck, ChevronRight, Star, Quote, Sparkles, Instagram } from 'lucide-react';
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

export default function Home() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const SLIDE_DURATION = 7000;

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

  const categories = [
    { name: "Custom Name Plates", image: "https://picsum.photos/seed/cat-name/400/400" },
    { name: "Shubh Symbols", image: "https://picsum.photos/seed/cat-symbols/400/400" },
    { name: "Evil Eye Decor", image: "https://picsum.photos/seed/cat-evil/400/400" },
    { name: "Decorative Hangings", image: "https://picsum.photos/seed/cat-hang/400/400" },
    { name: "Home Decor", image: "https://picsum.photos/seed/cat-decor/400/400" }
  ];

  const productsByCategory: Record<string, any[]> = {
    "Custom Name Plates": [
      { id: "name-1", name: "Floral Name Plate", price: 1599, originalPrice: 2200, imageUrl: "https://picsum.photos/seed/name1/600/600", category: "Custom Name Plates", tags: ["Bestseller"], rating: 5 },
      { id: "name-2", name: "Resin Door Sign", price: 1899, originalPrice: 2500, imageUrl: "https://picsum.photos/seed/name2/600/600", category: "Custom Name Plates", tags: ["New Arrival"], rating: 4 },
      { id: "name-3", name: "Couple Name Plaque", price: 1299, originalPrice: 1800, imageUrl: "https://picsum.photos/seed/name3/600/600", category: "Custom Name Plates", tags: ["Top Selling"], rating: 5 },
      { id: "name-4", name: "Modern Ceramic Nameplate", price: 2100, originalPrice: 3000, imageUrl: "https://picsum.photos/seed/name4/600/600", category: "Custom Name Plates", tags: ["Luxury"], rating: 5 },
    ],
    "Decorative Hangings": [
      { id: "hang-1", name: "Artisanal Wall Charm", price: 899, originalPrice: 1200, imageUrl: "https://picsum.photos/seed/hang1/600/600", category: "Decorative Hangings", tags: ["Bestseller"], rating: 5 },
      { id: "hang-2", name: "Nazar Battu Hanging", price: 550, originalPrice: 750, imageUrl: "https://picsum.photos/seed/hang2/600/600", category: "Evil Eye Protection Decor", tags: ["Protection"], rating: 4 },
      { id: "hang-3", name: "Boho Macrame Tassel", price: 699, originalPrice: 950, imageUrl: "https://picsum.photos/seed/hang3/600/600", category: "Decorative Hangings", tags: ["Boho"], rating: 5 },
      { id: "hang-4", name: "Mirror Work Toran", price: 1299, originalPrice: 1800, imageUrl: "https://picsum.photos/seed/hang4/600/600", category: "Decorative Hangings", tags: ["Traditional"], rating: 5 },
    ]
  };

  const testimonials = [
    {
      name: "Anjali Mehta",
      role: "Home Stylist",
      content: "The Lippan Art piece I bought is the soul of my living room. Every guest asks about it!",
      stars: 5
    },
    {
      name: "Rohan Sharma",
      role: "Gifting Enthusiast",
      content: "The personalized nameplate exceeded my expectations. Sumegha's attention to detail is unmatched.",
      stars: 5
    },
    {
      name: "Priya Das",
      role: "Bridal Client",
      content: "My bridal trunk box is a treasure. It's royal, elegant, and perfectly handcrafted.",
      stars: 5
    }
  ];

  const instagramPosts = [
    "https://picsum.photos/seed/insta1/400/400",
    "https://picsum.photos/seed/insta2/400/400",
    "https://picsum.photos/seed/insta3/400/400",
    "https://picsum.photos/seed/insta4/400/400",
    "https://picsum.photos/seed/insta5/400/400",
    "https://picsum.photos/seed/insta6/400/400"
  ];

  const heroSlides = [
    {
      badge: "BESPOKE DOOR DECOR",
      title: "CUSTOM",
      highlight: "NAME PLATES",
      categoryName: "Custom Name Plates",
      desc: "Artisanal door decor personalized for your beautiful home. Experience contemporary design through bespoke handmade elegance.",
      image: "https://picsum.photos/seed/art-nameplates/1920/1080",
    },
    {
      badge: "TRADITIONAL SPIRITUALITY",
      title: "SHUBH",
      highlight: "SYMBOLS",
      categoryName: "Shubh Symbols",
      desc: "Traditional auspicious motifs to bring positive energy. Each piece is meticulously handcrafted with love and devotion.",
      image: "https://picsum.photos/seed/spiritual-art/1920/1080",
    },
    {
      badge: "VERTICAL TREASURES",
      title: "DECORATIVE",
      highlight: "HANGINGS",
      categoryName: "Decorative Hangings",
      desc: "Bespoke ensembles for your vertical spaces. Celebrate traditions with our vibrant range of festive wall and door decor.",
      image: "https://picsum.photos/seed/wall-art-hangings/1920/1080",
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative w-full px-4 sm:px-6 pt-6 pb-12">
        <Carousel 
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative pl-0">
                <div className="relative h-[55vh] sm:h-[70vh] min-h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-black/5 border border-white/20">
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-1000",
                        current === index ? "opacity-80 blur-0 scale-100" : "opacity-0 blur-md scale-110"
                      )}
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/40" />
                  </div>

                  <div className={cn(
                    "relative z-10 h-full flex items-center justify-center p-6 text-center transition-all duration-1000 delay-300",
                    current === index ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
                  )}>
                    <div className="max-w-2xl w-full flex flex-col items-center space-y-6">
                      <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-[0.3em] text-white bg-white/10 backdrop-blur-md">
                        {slide.badge}
                      </div>
                      <div className="space-y-2">
                        <h1 className="text-3xl sm:text-7xl font-black leading-none uppercase tracking-tighter text-white drop-shadow-lg">
                          {slide.title}
                        </h1>
                        <h2 className="text-3xl sm:text-7xl font-black leading-none uppercase tracking-tighter text-primary drop-shadow-lg">
                          {slide.highlight}
                        </h2>
                      </div>
                      <p className="text-sm sm:text-xl text-white/90 font-medium leading-relaxed max-w-lg drop-shadow-md">
                        {slide.desc}
                      </p>
                      <Link href={`/products?category=${encodeURIComponent(slide.categoryName)}`} className="pt-4">
                        <Button className="h-14 px-12 rounded-xl text-[10px] font-bold uppercase tracking-widest gradient-primary border-none shadow-xl shadow-primary/40 active:scale-95 transition-all">
                          Shop {slide.highlight}
                        </Button>
                      </Link>
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
                className="relative h-1 w-8 bg-primary/10 rounded-full overflow-hidden transition-all duration-300"
                onClick={() => api?.scrollTo(i)}
              >
                {current === i && (
                  <div 
                    className="absolute top-0 left-0 h-full gradient-primary transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </Carousel>
      </section>

      <section className="py-12 bg-white/40 border-b border-white">
        <div className="container-normal px-4 text-center">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Discover Our</h4>
            <h2 className="text-xl lg:text-4xl font-black uppercase tracking-tight">Artistic Categories</h2>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat, index) => (
              <Link key={index} href={`/products?category=${encodeURIComponent(cat.name)}`} className="group block shrink-0 text-center space-y-2 w-28 sm:w-40">
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:bg-primary/5">
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <span className="block text-[9px] font-black uppercase tracking-widest text-foreground/60 group-hover:text-primary leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {Object.entries(productsByCategory).map(([catName, products], idx) => (
        <section key={catName} className={cn(
          "py-16 relative overflow-hidden",
          idx % 2 === 0 ? "bg-white/20" : "bg-white/40"
        )}>
          <div className="container-normal relative z-10 px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">{idx % 2 === 0 ? "Curated" : "Premium"} Selection</h4>
                <h2 className="text-xl lg:text-4xl font-black uppercase tracking-tight text-foreground leading-tight">{catName}</h2>
              </div>
              <Link href={`/products?category=${encodeURIComponent(catName)}`} className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px] group">
                <span className="whitespace-nowrap">VIEW ALL</span>
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Instagram Gallery Section */}
      <section className="py-24 bg-white/40">
        <div className="container-normal px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.5em]">
              <Instagram className="h-4 w-4" />
              @sumegha_handmades
            </div>
            <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight">On the Gram</h2>
            <p className="text-foreground/50 text-sm max-w-lg mx-auto">Follow our creative journey and see how our art comes to life in homes around the world.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {instagramPosts.map((src, i) => (
              <a key={i} href="https://instagram.com/sumegha_handmades" target="_blank" className="relative aspect-square group overflow-hidden rounded-xl">
                <Image 
                  src={src} 
                  alt={`Instagram post ${i + 1}`} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white h-8 w-8" />
                </div>
              </a>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link href="https://instagram.com/sumegha_handmades" target="_blank">
              <Button variant="outline" className="rounded-xl border-primary text-primary font-black uppercase tracking-widest text-[10px] px-8 h-12">
                Follow our Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="py-24 bg-white/60 overflow-hidden">
        <div className="container-normal px-4">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Our Collectors</p>
            <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight">Kind Words & Stories</h2>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <div className="flex flex-col items-center text-center space-y-8 px-6">
                    <Quote className="h-10 w-10 text-primary opacity-20" />
                    <div className="flex text-amber-400 gap-1 justify-center">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xl lg:text-3xl text-foreground/70 leading-relaxed italic font-light max-w-2xl">
                      "{t.content}"
                    </p>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase tracking-widest text-primary">{t.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, idx) => (
              <div key={idx} className="h-1.5 w-1.5 rounded-full bg-primary/20" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-normal px-4">
          <div className="bg-[#181113] text-white p-10 lg:p-20 rounded-[2.5rem] text-center space-y-6 relative overflow-hidden shadow-2xl">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[8px] font-bold uppercase tracking-[0.3em]">
                AI Powered Concierge
              </div>
              <h3 className="text-2xl lg:text-5xl font-black uppercase tracking-tight text-white">Your Personal Curator</h3>
              <p className="text-white/60 text-xs lg:text-lg font-light max-w-md mx-auto leading-relaxed">
                Describe your vibe, and let our AI curate the perfect handmade selection for you.
              </p>
            </div>
            <Link href="/discovery" className="inline-block">
              <Button className="h-12 px-10 rounded-xl text-[10px] font-bold uppercase tracking-widest gradient-primary">
                Start Discovery
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
