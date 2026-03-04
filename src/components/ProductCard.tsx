
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to wishlist", description: product.name });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({ title: "Added to cart", description: `${product.name} added.` });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.origin + '/products/' + product.id,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + '/products/' + product.id);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border-none bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="aspect-[4/5] overflow-hidden relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
          
          <div className="absolute top-3 right-3 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg" onClick={handleWishlist}>
              <Heart className={`h-5 w-5 ${wishlisted ? 'fill-primary text-primary' : ''}`} />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4 bg-white">
          <div className="mb-1 text-xs font-semibold text-primary/70 tracking-widest uppercase">{product.category}</div>
          <h3 className="font-headline font-bold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold font-headline">₹{product.price}</span>
            <Button size="sm" className="rounded-full gradient-primary" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
