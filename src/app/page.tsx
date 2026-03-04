"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Sparkles, Truck, Flower2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = [
    {
      id: "totes-1",
      name: "Handpainted Totes",
      description: "Handpainted canvas tote bag with floral design",
      price: 499,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA6Wp3OrYKWxnJKovXPGrYAQCV_d8tVOXq4s_bp4OReIvctpXW-UUiWqgmcol26DpVtoVy8_m4OJXZAUP9QBY-ROi3kFQaqLq97Y7GQoAkGKXl3SIWE1TX1JH3E9pIuCwFRYFH0V2Z5L6InlYHtv0FbC6tNhbEf6l1q5I97AJLPLJJPyQ_Y7qtgPzzz3sv98X1Jhals89nS7Bb1fPwQ7SRDu4wNZp_u9aBuRcGMQO6euaS8LbGvvxVDoZsXDAJYjfJvnrt2kR6ZaLR",
      category: "Bags"
    },
    {
      id: "jewelry-1",
      name: "Resin Jewelry",
      description: "Delicate handmade resin pendant with dried flowers",
      price: 299,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpZGGkKkhjyZ1E0B287LjDXE5yrM6gmVIWxdL41a3uySbmhvxLC_7Pv9T5NGDGAuhH40ubmCCt48GGLkxWlG5WkaOML3FkuGuG8igcM-p0Q6qfHB1Jf9R28Ye5rCU7elvAa-EkBrI6e3g0Cvdd7zjOwnROSDqrAZ6lAzFx6a1nK9dxu87MqUcxbNbbjQ2BUFb28zmjOjNXm1u0E8xhrSyW9R3PQLaBFkdVLqfezF4GieGa0_-GwH4rRgEXC2REKBpEzKXqa-mcX5ht",
      category: "Jewelry"
    },
    {
      id: "portraits-1",
      name: "Custom Portraits",
      description: "Custom watercolor portrait painting frame",
      price: 899,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHbGRC484HESNaNM__Z47bunGoUXrXD-bDNLxugcz_wfA4pqJm9Q1-M5jj2CEJlkrraUflEPZM96Vb_octhl8xOpwi5ViMy9GnyckuvGhvoUXIPndgPvzBbyiu9DqBTNsfhFnFYQSAV96x8yCuD2blJTpBFNJRFdl4NhHji0vHTp75NeBFAUu_Q6Eek723oFXbMIeVHT0RfXzL4IDgV9E9ZjAa8PdKUc4H3MrLhdrZY2gVm6HRTBG6Aa690KuBk8-9OE2BmcMpGIq8",
      category: "Art",
      tags: ['Bestseller']
    },
    {
      id: "hoops-1",
      name: "Floral Hoops",
      description: "Embroidery hoop art with floral pattern",
      price: 350,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpS4DmcA-Pjuqk4mhbPmQ0hw2xrvAV-Wd1WR5LeBBaOY-b1Z-Xjh2MGASydY1BQkfIWoCM9LRay4B97eyvpEFvbZRWQwCZANuAa6edN-tqEKhiUaSE6svsDNdXfjtazz5me3eamOi-IWj9zLgY1rsOZoKEkZK5uNy7qsFQaaz1WEJlv8REIH80yZeDQC6pFgIoaq1aaoj3MThCOI81_n55C3372vYHzPCUVK-eS3dKKz2JvKK5Qu7xRsicb2lKQmnm1w3tTrRjv53G",
      category: "Decor"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="px-4 py-8 md:py-16">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-xl min-h-[500px] flex items-center">
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3qxN3LYJdPEaN5vCr3rv6aBTfqLL4k8KN0LXFYDWDX_mng1VVncE4k928Rq_CIGJndudXp5TOqeBl3fZmhfmuEqLlKVrL3HD-OeUcPTmS3IbPp_KE1vGv6Q5W1O7b1Y4ZDiluzJ1ZQSovyZPGC5BHsYfn0-sWe_L85C6SBl-8TdJixXWLBcpJasjrQkdoojyWJoN7V6JLDbwarf6Yct4S_0A2KG2E9W-LKaCQngO009UPMOEU2R4FiIQSecKqInQfQCKPhB8ioXLJ"
                alt="Soft floral craft"
                fill
                className="object-cover brightness-[0.4]"
                priority
              />
            </div>
            
            <div className="relative z-10 w-full px-8 md:px-16 py-12 text-center md:text-left flex flex-col items-center md:items-start gap-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest">
                  Est. 2023
                </span>
                <h1 className="font-serif text-white text-4xl md:text-7xl font-bold leading-tight max-w-2xl drop-shadow-md">
                  Handmade Creations <br /> <span className="text-pink-300 italic">Crafted With Love</span>
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl drop-shadow-sm">
                  Discover unique, heartfelt pieces made just for you. From vibrant totes to bespoke custom jewelry.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-xl gradient-primary text-base font-bold tracking-wide">
                    View Collection
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto h-14 px-10 rounded-xl bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white hover:text-secondary text-base font-bold flex gap-2"
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                >
                  <MessageCircle className="h-5 w-5 text-green-400" />
                  WhatsApp Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary">Featured Collections</h2>
            <Link href="/products" className="text-primary text-sm font-bold uppercase tracking-widest group flex items-center gap-1">
              See All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Preview */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white/50 shadow-2xl relative">
            <Flower2 className="h-12 w-12 text-primary/30 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-6">Our Story</h2>
            <p className="text-secondary/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto italic">
              "Sumegha Handmades began as a small passion project in a sunlit corner of my room. Every stroke of paint and every thread woven carries a piece of my heart, aiming to bring warmth and beauty into your everyday life."
            </p>
            <div className="w-20 h-1 bg-primary/20 mx-auto rounded-full"></div>
            <Link href="/about" className="mt-8 inline-block text-primary font-bold hover:underline">Read the full journey</Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-4 container mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16 text-secondary">How to Order</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          <div className="absolute hidden md:block left-0 right-0 top-6 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10"></div>
          {[
            { id: '01', title: "Choose Your Favorite", desc: "Browse our collection and select the item that speaks to you.", icon: ShoppingBag },
            { id: '02', title: "Message on WhatsApp", desc: "Click the order button to send us the product details directly.", icon: MessageCircle },
            { id: '03', title: "Wait for Delivery", desc: "We'll craft, pack with love, and ship it to your doorstep.", icon: Truck }
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center text-center gap-4">
                <div className="size-16 rounded-full bg-white shadow-lg border border-primary/10 flex items-center justify-center z-10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-secondary">{step.title}</h3>
                <p className="text-secondary/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="px-4 py-20 container mx-auto">
        <div className="bg-secondary text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden text-center flex flex-col items-center gap-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 -mr-16 -mt-16 text-primary">
            <Sparkles className="w-full h-full" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold">Ask the Art Concierge</h2>
          <p className="text-white/60 text-lg max-w-md font-light">
            Not sure which piece fits your aesthetic? Our AI Assistant can curate a selection based on your preferences.
          </p>
          <Link href="/discovery">
            <Button size="lg" className="gradient-primary h-14 px-12 rounded-xl text-lg font-bold">
              Start Discovery
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}