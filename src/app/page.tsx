
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
import productsData from "@/lib/products.json";
import categoriesData from "@/lib/categories.json";
import placeholderData from "@/app/lib/placeholder-images.json";
import { Product } from "@/lib/types";

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

  const productsByCategory: Record<string, Product[]> = productsData.products.reduce((acc: Record<string, Product[]>, product: Product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

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

  const instagramPosts = placeholderData.placeholderImages.filter(img => img.id.startsWith('insta-'));

  const heroSlides = categoriesData.categories.map((cat, idx) => ({
    badge: "COLLECTION HIGHLIGHT",
    title: cat.name.split(' ')[0].toUpperCase(),
    highlight: cat.name.split(' ').slice(1).join(' ').toUpperCase(),
    categoryName: cat.name,
    desc: cat.description,
    // Using variety from categories or fallback to variety picsum
    image: cat.imageUrl || `https://picsum.photos/seed/hero-${idx}/1920/1080`
  }));

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative w-full px-4 sm:px-6 pt-6 pb-24">
        <Carousel 
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full max-w-[1440px] mx-auto"
        >
          <CarouselContent className="ml-0">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative pl-0">
                <div className="relative h-[65vh] sm:h-[75vh] min-h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl bg-black/5 border border-white/20">
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={slide.image}
                      alt={slide.categoryName}
                      fill
                      sizes="100vw"
                      className={cn(
                        "object-cover transition-all duration-1000",
                        current === index ? "opacity-80 blur-0 scale-100" : "opacity-0 blur-md scale-110"
                      )}
                      priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
                  </div>

                  <div className={cn(
                    "relative z-10 h-full flex items-center justify-center p-8 text-center transition-all duration-1000 delay-300",
                    current === index ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
                  )}>
                    <div className="max-w-4xl w-full flex flex-col items-center space-y-8">
                      <div className="inline-block px-5 py-2 rounded-full border border-white/30 text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 backdrop-blur-md">
                        {slide.badge}
                      </div>
                      <div className="space-y-4">
                        <h1 className="text-4xl sm:text-8xl font-black leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
                          {slide.title}
                        </h1>
                        <h2 className="text-4xl sm:text-8xl font-black leading-none uppercase tracking-tighter text-primary drop-shadow-2xl">
                          {slide.highlight}
                        </h2>
                      </div>
                      <p className="text-base sm:text-2xl text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-lg px-4">
                        {slide.desc}
                      </p>
                      <div className="pt-10">
                        <Link href={`/products?category=${encodeURIComponent(slide.categoryName)}`}>
                          <Button className="h-16 px-14 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] gradient-primary border-none shadow-2xl shadow-primary/50 active:scale-95 transition-all hover:scale-105">
                            Shop {slide.categoryName}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className="relative h-1.5 w-10 bg-primary/20 rounded-full overflow-hidden transition-all duration-300"
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

      <section className="py-20 bg-white/40 border-y border-white">
        <div className="container-normal px-4 text-center">
          <div className="flex flex-col items-center gap-2 mb-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Discover Our</h4>
            <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight">Artistic Categories</h2>
          </div>
          <div className="flex items-center gap-8 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categoriesData.categories.map((cat, index) => (
              <Link key={index} href={`/products?category=${encodeURIComponent(cat.name)}`} className="group block shrink-0 text-center space-y-4 w-32 sm:w-48">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary/20">
                  <Image 
                    src={cat.imageUrl} 
                    alt={cat.name} 
                    fill
                    sizes="(max-width: 639px) 30vw, 20vw"
                    className="object-cover" 
                  />
                </div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-primary leading-tight px-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {Object.entries(productsByCategory).map(([catName, products], idx) => (
        <section key={catName} className={cn(
          "py-24 relative overflow-hidden",
          idx % 2 === 0 ? "bg-white/20" : "bg-white/40"
        )}>
          <div className="container-normal relative z-10 px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">{idx % 2 === 0 ? "Curated" : "Premium"} Selection</h4>
                <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight text-foreground leading-tight">{catName}</h2>
              </div>
              <Link href={`/products?category=${encodeURIComponent(catName)}`} className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] group border-b border-primary/20 pb-1">
                <span className="whitespace-nowrap">VIEW COLLECTION</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-white/40">
        <div className="container-normal px-4">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-3 text-primary text-[11px] font-black uppercase tracking-[0.6em]">
              <Instagram className="h-5 w-5" />
              @sumegha_handmades
            </div>
            <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tight">On the Gram</h2>
            <p className="text-foreground/50 text-base max-w-xl mx-auto leading-relaxed">Follow our creative journey and see how our art comes to life in homes around the world.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramPosts.map((post, i) => (
              <a key={i} href="https://instagram.com/sumegha_handmades" target="_blank" className="relative aspect-square group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all">
                <Image 
                  src={post.imageUrl} 
                  alt={`Instagram post ${i + 1}`} 
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 16.66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white h-10 w-10 drop-shadow-lg" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/60 overflow-hidden">
        <div className="container-normal px-4">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Our Collectors</p>
            <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tight">Kind Words & Stories</h2>
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <div className="flex flex-col items-center text-center space-y-10 px-8">
                    <Quote className="h-16 w-16 text-primary opacity-20" />
                    <div className="flex text-amber-400 gap-2 justify-center">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star key={s} className="h-6 w-6 fill-current" />
                      ))}
                    </div>
                    <p className="text-2xl lg:text-4xl text-foreground/80 leading-relaxed italic font-light max-w-3xl">
                      "{t.content}"
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-base font-black uppercase tracking-[0.3em] text-primary">{t.name}</h4>
                      <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-[0.3em]">{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section className="py-24">
        <div className="container-normal px-4">
          <div className="bg-[#181113] text-white p-12 lg:p-24 rounded-[3rem] lg:rounded-[5rem] text-center space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image src={placeholderData.placeholderImages.find(img => img.id === 'hero-pattern')?.imageUrl || ''} alt="pattern" fill className="object-cover" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest">
                AI Powered Art Concierge
              </div>
              <h3 className="text-3xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight">Your Personal Curator</h3>
              <p className="text-white/60 text-base lg:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
                Describe your vibe, and let our AI curate the perfect handmade selection for you.
              </p>
              <div className="pt-6">
                <Link href="/discovery">
                  <Button className="h-16 px-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] gradient-primary shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
                    Start Discovery
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
