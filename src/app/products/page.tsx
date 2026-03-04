"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchModeParam = searchParams.get('search');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModeParam === 'true' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchModeParam]);

  const categories = ['All', 'Festive / Special Gifts', 'Home Decor', 'Wedding', 'Diwali decor', 'Anniversary'];

  const allProducts = useMemo(() => PlaceHolderImages.map((img, i) => ({
    id: img.id,
    name: img.description.split(' ').slice(0, 3).join(' '),
    description: img.description,
    price: [249, 599, 1200, 450, 899, 1500][i % 6],
    originalPrice: [399, 799, 1500, 550, 1100, 1800][i % 6],
    imageUrl: img.imageUrl,
    category: categories.slice(1)[i % 5],
    tags: i % 3 === 0 ? ['Bestseller'] : i % 4 === 0 ? ['New Arrival'] : []
  })), [categories]);

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="text-center md:text-left space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">The Collection</p>
          <h1 className="text-2xl lg:text-6xl font-black font-headline uppercase tracking-tight">Art Gallery</h1>
          <p className="text-muted-foreground text-sm lg:text-lg max-w-md font-light">Hand-picked treasures waiting for a home.</p>
        </div>
        
        <div className="flex flex-col gap-6 w-full md:max-w-2xl">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input 
              ref={searchInputRef}
              placeholder="Search unique art..." 
              className="w-full pl-12 h-14 rounded-2xl border border-primary/10 bg-white/50 backdrop-blur-sm focus:bg-white shadow-sm outline-none px-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map(cat => (
              <Button 
                key={cat} 
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={cn(
                  "rounded-full h-10 px-6 text-[10px] font-bold uppercase tracking-widest transition-all shrink-0",
                  selectedCategory === cat 
                    ? "gradient-primary border-none shadow-lg shadow-primary/20" 
                    : "border-primary/10 bg-white/50 hover:bg-primary/5"
                )}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white/40 rounded-[3rem] border-2 border-dashed border-primary/10 space-y-6">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-10 w-10 text-primary/30" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-black uppercase tracking-tight">No Results Found</p>
            <p className="text-muted-foreground text-xs font-light max-w-xs mx-auto">Try adjusting your filters or search terms.</p>
          </div>
          <Button 
            variant="link" 
            onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} 
            className="text-primary font-black uppercase tracking-widest text-[10px]"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}