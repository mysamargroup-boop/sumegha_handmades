
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import categoriesData from "@/lib/categories.json";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="container-normal mx-auto py-8 lg:py-16 px-4 space-y-12 lg:space-y-16">
        <div className="text-center space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">Curated Selections</p>
          <h1 className="text-3xl lg:text-7xl font-black uppercase tracking-tight text-foreground">Our Collections</h1>
          <p className="text-foreground/50 text-xs lg:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Explore the different realms of artistry at Sumegha Handmades. From royal weddings to soulful home sanctuaries.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-20">
          {categoriesData.categories.map((collection, index) => (
            <div key={index} className="space-y-8 lg:space-y-10">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <Image 
                    src={collection.imageUrl} 
                    alt={collection.name} 
                    fill 
                    sizes="(max-width: 1023px) 33vw, 10vw" 
                    className="object-cover" 
                  />
                </div>
                
                <div className="space-y-3 lg:space-y-4 max-w-xl px-4">
                  <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-foreground">{collection.name}</h2>
                  <p className="text-foreground/60 text-xs lg:text-base font-light leading-relaxed">{collection.description}</p>
                  <Link href={`/products?category=${encodeURIComponent(collection.name)}`}>
                    <button className="flex items-center justify-center gap-2 text-primary font-black uppercase tracking-widest text-[9px] group mx-auto border-b border-primary/20 pb-0.5">
                      Explore Full Collection
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>

              {collection.subCategories.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8 max-w-md lg:max-w-4xl mx-auto px-4">
                  {collection.subCategories.map((sub, sIdx) => (
                    <Link key={sIdx} href={`/products?category=${encodeURIComponent(collection.name)}`} className="group text-center space-y-2">
                      <div className="relative aspect-square rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-primary/10">
                        <Image src={sub.imageUrl} alt={sub.name} fill sizes="(max-width: 639px) 50vw, 25vw" className="object-cover" />
                      </div>
                      <p className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-primary transition-colors leading-tight px-1">
                        {sub.name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
