
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

  const allProducts = useMemo(() => PlaceHolderImages.map((img, i) => ({
    id: img.id,
    name: img.description.split(' ').slice(0, 3).join(' '),
    description: img.description,
    price: [249, 599, 1200, 450, 899, 1500][i % 6],
    imageUrl: img.imageUrl,
    category: ['Ceramics', 'Paintings', 'Jewelry', 'Boho', 'Decor', 'Textile'][i % 6]
  })), []);

  const categories = ['All', 'Ceramics', 'Paintings', 'Jewelry', 'Decor', 'Boho', 'Textile'];

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h1 className="text-4xl lg:text-6xl font-black font-headline mb-4">Our Gallery</h1>
          <p className="text-muted-foreground text-lg">Hand-picked treasures waiting for a home.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:max-w-xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 h-12 rounded-full border-primary/20 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.slice(0, 4).map(cat => (
              <Button 
                key={cat} 
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`rounded-full h-12 px-6 ${selectedCategory === cat ? 'gradient-primary' : 'border-primary/20'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
          <p className="text-xl text-muted-foreground">No products found matching your filters.</p>
          <Button variant="link" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}} className="text-primary mt-4">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
