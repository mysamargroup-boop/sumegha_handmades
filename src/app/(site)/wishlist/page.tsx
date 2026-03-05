"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-headline font-black mb-4 text-center">Wishlist is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Save the items you love to your wishlist and come back to them anytime!</p>
        <Link href="/products">
          <Button size="lg" className="rounded-full gradient-primary px-10">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-4xl lg:text-6xl font-black font-headline uppercase tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground text-lg">Your curated collection of handmade dreams.</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
