
"use client";

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Share2, ArrowLeft, MessageCircle, Star, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart, addToWishlist, isWishlisted, removeFromWishlist } = useStore();
  
  const productData = PlaceHolderImages.find(p => p.id === id);
  if (!productData) return <div className="container mx-auto p-20 text-center">Product not found.</div>;

  const product = {
    id: productData.id,
    name: productData.description.split(' ').slice(0, 3).join(' '),
    description: productData.description,
    price: 899,
    imageUrl: productData.imageUrl,
    category: 'Handmade Art'
  };

  const wishlisted = isWishlisted(product.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer hover:opacity-80 transition-opacity">
                <Image src={`https://picsum.photos/seed/${product.id}${i}/400/400`} alt="Detail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className="gradient-primary px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">{product.category}</Badge>
              <div className="flex text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-xs text-muted-foreground">(24 Reviews)</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black font-headline tracking-tight">{product.name}</h1>
            <p className="text-4xl font-black font-headline text-primary">₹{product.price}</p>
          </div>

          <div className="p-6 rounded-3xl bg-secondary/50 border border-primary/5 space-y-4">
            <h3 className="font-bold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Artist's Description
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">{product.description}. Each piece is meticulously handcrafted, ensuring no two items are exactly alike. We use eco-friendly materials to create art that lasts a lifetime.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-16 px-10 rounded-full text-xl font-bold gradient-primary flex-grow shadow-xl" onClick={() => {addToCart(product); toast({title: "Added to cart"});}}>
              <ShoppingCart className="h-6 w-6 mr-2" />
              Add to Bag
            </Button>
            <Button size="icon" variant="outline" className={`h-16 w-16 rounded-full border-primary/20 ${wishlisted ? 'bg-primary/5 text-primary' : ''}`} onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}>
              <Heart className={`h-8 w-8 ${wishlisted ? 'fill-primary' : ''}`} />
            </Button>
            <Button size="icon" variant="outline" className="h-16 w-16 rounded-full border-primary/20" onClick={handleShare}>
              <Share2 className="h-8 w-8" />
            </Button>
          </div>

          <div className="pt-8 border-t space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-primary/30">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-sm">Have Questions?</p>
                  <p className="text-xs text-muted-foreground">Ask the artist directly on WhatsApp</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-green-600 font-bold" onClick={() => window.open(`https://wa.me/919876543210?text=Hi, I have a question about ${product.name}`, '_blank')}>
                Chat Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
