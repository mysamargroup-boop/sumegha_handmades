
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Tag, Sparkles, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product & { rating?: number };
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

  const discountPercentage = product.regular_price
    ? Math.round(((product.regular_price - product.sale_price) / product.regular_price) * 100)
    : 0;

  // Generate SEO friendly nested slug
  const categorySlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const subCategorySlug = product.subcategory ? product.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-') : "handcrafted";
  const productUrl = `/collections/${categorySlug}/${subCategorySlug}/${product.id}`;

  return (
    <div className="group flex flex-col gap-3 bg-white p-2 rounded-xl shadow-sm hover:shadow-md hover:bg-primary/5 transition-all duration-300 border border-primary/5 w-full">
      <Link href={productUrl} className="block">
        <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="handmade product"
          />

          <div className="absolute top-2 right-2 z-10">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full size-8 bg-white/90 backdrop-blur-sm shadow-sm text-foreground/40 hover:text-primary transition-all border-none"
              onClick={handleWishlist}
            >
              <Heart className={cn("h-3.5 w-3.5 transition-colors", wishlisted && "fill-primary text-primary")} />
            </Button>
          </div>

          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-widest border border-white/20">
              {discountPercentage}% OFF
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {product.tags?.slice(0, 1).map((tag) => (
              <div key={tag} className="bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[7px] text-foreground font-black uppercase tracking-widest border border-primary/10 shadow-sm flex items-center gap-1">
                <Sparkles className="h-2 w-2 text-primary" />
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="px-1 pt-3 pb-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[8px] font-bold text-primary uppercase tracking-widest opacity-80">
              <Tag className="h-2.5 w-2.5" />
              {product.category}
            </div>
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="h-2.5 w-2.5 fill-current" />
              <span className="text-[9px] font-bold text-foreground/60">{product.rating || 5}.0</span>
            </div>
          </div>

          <p className="text-foreground text-[12px] font-black uppercase tracking-tight truncate leading-tight">
            {product.name}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-primary text-[14px] font-black">₹{product.sale_price}</p>
            {product.regular_price && (
              <p className="text-muted-foreground text-[10px] line-through decoration-primary/20 decoration-2 font-bold">₹{product.regular_price}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
