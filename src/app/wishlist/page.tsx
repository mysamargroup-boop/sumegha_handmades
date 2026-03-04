
"use client";

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
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
        <h1 className="text-4xl font-headline font-black mb-4">Wishlist is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Save the items you love to your wishlist and come back to them anytime!</p>
        <Link href="/products">
          <Button size="lg" className="rounded-full gradient-primary px-10">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl lg:text-6xl font-black font-headline mb-4">My Wishlist</h1>
      <p className="text-muted-foreground mb-12 text-lg">Your curated collection of handmade dreams.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
