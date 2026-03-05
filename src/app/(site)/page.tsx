
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Truck, ChevronRight, Star, Quote, Sparkles, Instagram, Gem } from 'lucide-react';
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
import placeholderData from "@/lib/placeholder-images.json";
import { Product } from "@/lib/types";

// Sanity imports
import { getAllProducts, getAllCategories, getAllTestimonials, getSiteSettings } from "@/sanity/lib/queries";
import type { SanityCategory, SanityTestimonial, SanitySiteSettings } from "@/sanity/lib/queries";

export default function Home() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [spotlightApi, setSpotlightApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [spotlightCurrent, setSpotlightCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  // Sanity data states
  const [sanityProducts, setSanityProducts] = React.useState<Product[] | null>(null);
  const [sanityCategories, setSanityCategories] = React.useState<SanityCategory[] | null>(null);
  const [sanityTestimonials, setSanityTestimonials] = React.useState<SanityTestimonial[] | null>(null);
  const [sanitySettings, setSanitySettings] = React.useState<SanitySiteSettings | null>(null);

  const SLIDE_DURATION = 7000;

  const plugin = React.useRef(
    Autoplay({ delay: SLIDE_DURATION, stopOnInteraction: false })
  );

  const spotlightPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  // Fetch Sanity data on mount
  React.useEffect(() => {
    async function fetchSanityData() {
      try {
        const [products, categories, testimonials, settings] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
          getAllTestimonials(),
          getSiteSettings(),
        ]);
        if (products && products.length > 0) setSanityProducts(products);
        if (categories && categories.length > 0) setSanityCategories(categories);
        if (testimonials && testimonials.length > 0) setSanityTestimonials(testimonials);
        if (settings) setSanitySettings(settings);
      } catch (error) {
        console.log("Sanity fetch failed, using local data:", error);
      }
    }
    fetchSanityData();
  }, []);

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
    if (!spotlightApi) return;
    setSpotlightCurrent(spotlightApi.selectedScrollSnap());
    spotlightApi.on("select", () => {
      setSpotlightCurrent(spotlightApi.selectedScrollSnap());
    });
  }, [spotlightApi]);

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + (100 / (SLIDE_DURATION / 100))));
    }, 100);
    return () => clearInterval(interval);
  }, [api, current]);

  // Use Sanity data if available, otherwise fallback to local JSON
  const products: Product[] = sanityProducts || productsData.products as Product[];

  const categories = sanityCategories || categoriesData.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    imageUrl: cat.imageUrl,
    subCategories: cat.subCategories,
  }));

  const productsByCategory: Record<string, Product[]> = products.reduce((acc: Record<string, Product[]>, product: Product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Fallback testimonials
  const fallbackTestimonials = [
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

  const testimonials = sanityTestimonials || fallbackTestimonials;

  const instagramPosts = placeholderData.placeholderImages.filter(img => img.id.startsWith('insta-'));

  // Fallback spotlight images
  const fallbackSpotlightImages = [
    { url: "https://picsum.photos/seed/spot1/1000/1000", title: "Artisanal Details" },
    { url: "https://picsum.photos/seed/spot2/1000/1000", title: "Premium Finishes" },
    { url: "https://picsum.photos/seed/spot3/1000/1000", title: "Bespoke Creations" },
    { url: "https://picsum.photos/seed/spot4/1000/1000", title: "Handcrafted Love" },
  ];

  const spotlightImages = sanitySettings?.spotlightImages?.map(s => ({
    url: s.imageUrl,
    title: s.title,
  })) || fallbackSpotlightImages;

  // Hero slides: use Sanity settings if available, else derive from categories
  const heroSlides = sanitySettings?.heroSlides?.map(slide => ({
    badge: slide.badge || "COLLECTION HIGHLIGHT",
    title: slide.title || "",
    highlight: slide.highlight || "",
    categoryName: slide.title + " " + slide.highlight,
    desc: slide.description || "",
    image: slide.imageUrl || "",
    linkUrl: slide.linkUrl || "",
    buttonText: slide.buttonText || "Shop Now",
  })) || categories.map((cat, idx) => ({
    badge: "COLLECTION HIGHLIGHT",
    title: cat.name.split(' ')[0].toUpperCase(),
    highlight: cat.name.split(' ').slice(1).join(' ').toUpperCase(),
    categoryName: cat.name,
    desc: cat.description,
    image: cat.imageUrl || `https://picsum.photos/seed/hero-${idx}/1920/1080`,
    linkUrl: `/products?category=${encodeURIComponent(cat.name)}`,
    buttonText: `Shop ${cat.name}`,
  }));

  // Instagram
  const instaUrl = sanitySettings?.instagramUrl || "https://instagram.com/sumegha_handmades";
  const instaHandle = sanitySettings?.instagramHandle || "@sumegha_handmades";
  const sanityInstaPosts = sanitySettings?.instagramPosts;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Mobile-Only Top Category Slider with Blur Overlay */}
      <section className="md:hidden py-4 bg-white/40 border-b border-white relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pr-12 snap-x snap-mandatory">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center shrink-0 space-y-2 group snap-center"
            >
              <div className="relative p-[2px] bg-gradient-to-tr from-[#FFD700] via-[#FF69B4] to-[#cf1745] rounded-full shadow-sm">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-tight text-foreground/70 group-hover:text-primary transition-colors text-center w-[72px] leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
        {/* Right side blur overlay to indicate sliding */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/20 to-transparent pointer-events-none z-10" />
      </section>

      {/* Full-Width Hero Section */}
      <section className="relative w-full overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative pl-0">
                <div className="relative h-[50vh] lg:h-[60vh] min-h-[400px] w-full bg-black/5">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={slide.image}
                      alt={slide.categoryName}
                      fill
                      sizes="100vw"
                      className={cn(
                        "object-cover transition-all duration-1000 ease-in-out",
                        current === index ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-110"
                      )}
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
                  </div>

                  <div className={cn(
                    "relative z-10 h-full flex items-center justify-center p-6 sm:p-12 pb-20 sm:pb-32 text-center transition-all duration-1000 ease-out",
                    current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}>
                    <div className="max-w-4xl w-full flex flex-col items-center space-y-6">
                      <div className="flex flex-col items-center gap-4">
                        <div className="inline-block px-5 py-2 rounded-full border border-white/30 text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 backdrop-blur-md">
                          {slide.badge}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none uppercase tracking-tighter text-white drop-shadow-lg">
                          {slide.title}
                        </h1>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none uppercase tracking-tighter text-primary drop-shadow-lg">
                          {slide.highlight}
                        </h2>
                      </div>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-md px-4">
                        {slide.desc}
                      </p>
                      <div className="pt-4 lg:pt-8">
                        <Link href={slide.linkUrl || `/products?category=${encodeURIComponent(slide.categoryName)}`}>
                          <Button className="h-12 lg:h-14 px-10 lg:px-14 rounded-2xl text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] gradient-primary border-none shadow-none active:scale-95 transition-all hover:scale-105">
                            {slide.buttonText}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className="relative h-1.5 w-10 bg-white/20 rounded-full overflow-hidden transition-all duration-300"
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

      {/* Desktop Artistic Categories Grid */}
      <section className="py-20 bg-white/40 border-y border-white">
        <div className="container-normal px-4 text-center">
          <div className="flex flex-col items-center gap-2 mb-12">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Discover Our</h4>
            <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight">Artistic Categories</h2>
          </div>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-12 pb-6 px-4">
            {categories.map((cat, index) => (
              <Link key={index} href={`/products?category=${encodeURIComponent(cat.name)}`} className="group block text-center space-y-4 w-full sm:w-48">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white transition-all duration-500 group-hover:scale-105 group-hover:border-primary/20">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 639px) 30vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <span className="block text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-primary leading-tight px-1 truncate sm:whitespace-normal">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Masterpiece Gallery Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-normal px-4 text-center mb-16 space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Premium Spotlight</p>
          <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tight">The Masterpiece Gallery</h2>
        </div>

        <Carousel
          setApi={setSpotlightApi}
          plugins={[spotlightPlugin.current]}
          opts={{ align: "center", loop: true }}
          className="w-full max-w-[1440px] mx-auto"
        >
          <CarouselContent className="-ml-4 sm:-ml-8">
            {spotlightImages.map((slide, index) => {
              const isActive = spotlightCurrent === index;
              return (
                <CarouselItem key={index} className="pl-4 sm:pl-8 basis-[80%] sm:basis-[60%] lg:basis-[45%]">
                  <div className={cn(
                    "relative aspect-square sm:aspect-video rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-in-out border-4 border-white",
                    isActive ? "scale-100 blur-0 opacity-100 shadow-none" : "scale-90 blur-md opacity-40 shadow-none"
                  )}>
                    <Image src={slide.url} alt={slide.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center space-y-4 transition-all duration-700 delay-100 ease-out",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}>
                      <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Product Collections Grid */}
      {Object.entries(productsByCategory).map(([catName, catProducts], idx) => (
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
              {catProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Instagram Feed */}
      <section className="py-24 bg-white/40">
        <div className="container-normal px-4">
          <div className="text-center mb-16 space-y-6">
            <Link
              href={instaUrl}
              target="_blank"
              className="inline-flex items-center gap-3 text-primary text-[11px] font-black uppercase tracking-[0.6em] hover:opacity-80 transition-opacity"
            >
              <Instagram className="h-5 w-5" />
              {instaHandle}
            </Link>
            <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tight">On the Gram</h2>
            <p className="text-foreground/50 text-base max-w-xl mx-auto leading-relaxed">Follow our creative journey and see how our art comes to life in homes around the world.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {(sanityInstaPosts && sanityInstaPosts.length > 0 ? sanityInstaPosts.map((url, i) => ({ imageUrl: url, key: i })) : instagramPosts.map((post, i) => ({ imageUrl: post.imageUrl, key: i }))).map((post) => (
              <a key={post.key} href={instaUrl} target="_blank" className="relative aspect-square group overflow-hidden rounded-2xl transition-all">
                <Image
                  src={post.imageUrl}
                  alt={`Instagram post ${post.key + 1}`}
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

      {/* Testimonials */}
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

      {/* Signature & Our Story Section */}
      <section className="py-24 bg-white/40 overflow-hidden">
        <div className="container-normal px-4 flex flex-col items-center text-center space-y-8">
          <h2 className="text-7xl lg:text-9xl font-cursive text-primary lowercase tracking-tight drop-shadow-sm select-none">
            Sumegha
          </h2>
          <div className="max-w-2xl space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">The Heart Behind the Art</p>
            <p className="text-xl lg:text-3xl font-light text-foreground/80 leading-relaxed italic">
              "{sanitySettings?.aboutQuote || "Every piece I craft carries a fragment of my soul and a whisper of tradition."}"
            </p>
            <p className="text-sm lg:text-base text-foreground/60 leading-relaxed font-medium">
              {sanitySettings?.aboutStory || "What started as a simple desire to preserve the warmth of human touch has evolved into a legacy of craftsmanship. Our work is a celebration of patience, precision, and the beautiful imperfections of the handmade process."}
            </p>
          </div>
          <Link href="/about">
            <Button variant="link" className="text-primary font-black uppercase tracking-widest text-[10px] border-b border-primary/20 pb-1 h-auto">
              Read Our Full Story
            </Button>
          </Link>
        </div>
      </section>

      {/* Discovery CTA */}
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
