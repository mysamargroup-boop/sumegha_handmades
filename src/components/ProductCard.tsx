
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Tag, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from saved" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to saved", description: product.name });
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group flex flex-col gap-2 sm:gap-4 bg-white p-2 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full aspect-square bg-gray-50 rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="handmade product"
          />
          
          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full size-8 sm:size-10 bg-white/90 backdrop-blur-sm shadow-md text-foreground/40 hover:text-primary transition-all border-none hover:scale-110 active:scale-90"
              onClick={handleWishlist}
            >
              <Heart className={cn("h-4 w-4 sm:h-5 sm:w-5 transition-colors", wishlisted && "fill-primary text-primary")} />
            </Button>
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-white text-[8px] sm:text-[10px] font-black px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Tags (Bestseller, New Arrivals) */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
            {product.tags?.map((tag) => (
              <div key={tag} className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] text-foreground font-black uppercase tracking-widest border border-primary/10 shadow-sm flex items-center gap-1">
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-primary" />
                {tag}
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-2 sm:px-3 pb-2 sm:pb-3 pt-3 sm:pt-4 space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold text-primary uppercase tracking-[0.2em] opacity-80">
            <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            {product.category}
          </div>
          <p className="text-foreground text-[12px] sm:text-[14px] font-black uppercase tracking-tight truncate leading-none">
            {product.name}
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <p className="text-primary text-[13px] sm:text-[16px] font-black">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-muted-foreground text-[10px] sm:text-[12px] line-through decoration-primary/30 font-light">₹{product.originalPrice}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
