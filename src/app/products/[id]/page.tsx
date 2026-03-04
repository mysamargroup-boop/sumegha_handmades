"use client";

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Share2, Star, Sparkles, ChevronRight, Zap, ShieldCheck, Leaf, Medal } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart, addToWishlist, isWishlisted, removeFromWishlist } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const productData = PlaceHolderImages.find(p => p.id === id);
  
  if (!productData) {
    return (
      <div className="container mx-auto p-32 text-center space-y-6">
        <h1 className="text-3xl lg:text-5xl font-black uppercase">Product not found</h1>
        <p className="text-muted-foreground">The masterpiece you are looking for is missing from our gallery.</p>
        <Link href="/products">
          <Button className="gradient-primary rounded-full px-8">Back to Gallery</Button>
        </Link>
      </div>
    );
  }

  const category = productData.id.startsWith('fest') ? 'Festive' : productData.id.startsWith('home') ? 'Home Decor' : 'Wedding';
  const price = productData.id.startsWith('fest') ? 899 : productData.id.startsWith('home') ? 1299 : 3500;
  const originalPrice = Math.round(price * 1.54);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const product = {
    id: productData.id,
    name: productData.id.includes('-') 
      ? productData.description.split(' - ')[0] 
      : productData.description.split(' ').slice(0, 3).join(' '),
    description: productData.description,
    price,
    originalPrice,
    imageUrl: productData.imageUrl,
    category
  };

  const wishlisted = isWishlisted(product.id);

  const recommendedProducts = PlaceHolderImages
    .filter(p => p.id !== id && (p.id.startsWith(id.split('-')[0]) || p.description.includes(category)))
    .slice(0, 4)
    .map((img, i) => ({
      id: img.id,
      name: img.description.split(' ').slice(0, 3).join(' '),
      description: img.description,
      price: [899, 1299, 3500][i % 3],
      originalPrice: [1200, 1800, 4500][i % 3],
      imageUrl: img.imageUrl,
      category: category,
      tags: i % 2 === 0 ? ['Bestseller'] : []
    }));

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

  const handleWhatsAppShare = () => {
    const text = `Check out this beautiful ${product.name} at Sumegha Handmades: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const galleryImages = [
    product.imageUrl,
    `https://picsum.photos/seed/${product.id}2/800/1000`,
    `https://picsum.photos/seed/${product.id}3/800/1000`
  ];

  const specifications = [
    { label: "Dimensions", value: "12 x 12 inches" },
    { label: "Weight", value: "850 grams" },
    { label: "Material", value: "Handcrafted Ceramic / Clay" },
    { label: "Finish", value: "Glossy Protective Coat" }
  ];

  const artisanBadges = [
    { icon: Medal, text: "Award Winning Artist", color: "text-amber-500" },
    { icon: Leaf, text: "Eco-Friendly", color: "text-green-600" },
    { icon: ShieldCheck, text: "Authenticity Guaranteed", color: "text-blue-500" }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-primary transition-colors">Gallery</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-24">
          <div className="space-y-4 w-full relative">
            <Carousel className="w-full" onSelect={(api) => setCurrentSlide(api?.selectedScrollSnap() || 0)}>
              <CarouselContent>
                {galleryImages.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white w-full">
                      <Image src={img} alt={product.name} fill className="object-cover" priority={idx === 0} />
                      {idx === 0 && (
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                          <Badge className="bg-primary text-white border-none px-3 py-1 rounded-full uppercase tracking-widest text-[9px] font-black shadow-lg">
                            {discount}% OFF
                          </Badge>
                          <Badge className="bg-black/50 backdrop-blur-md text-white border-none px-3 py-1 rounded-full uppercase tracking-widest text-[9px] font-black shadow-lg">
                            BESTSELLER
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            <div className="flex justify-center gap-2">
              {galleryImages.map((_, idx) => (
                <div key={idx} className={cn("h-1.5 rounded-full transition-all duration-300", currentSlide === idx ? "w-6 bg-primary" : "w-1.5 bg-primary/20")} />
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8 w-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary/10 text-primary border-none px-3 py-1 rounded-full uppercase tracking-widest text-[9px] font-black">{product.category}</Badge>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">(24 reviews)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className={cn("h-10 w-10 rounded-full border-primary/10 transition-all", wishlisted ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white hover:bg-primary/5')} onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}>
                    <Heart className={cn("h-4 w-4", wishlisted && "fill-primary")} />
                  </Button>
                  <Button size="icon" variant="outline" className="h-10 w-10 rounded-full border-primary/10 bg-white hover:bg-primary/5 transition-all" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black font-headline tracking-tight uppercase leading-tight text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <p className="text-3xl lg:text-5xl font-black font-headline text-primary">₹{product.price}</p>
                <p className="text-xl lg:text-2xl text-muted-foreground line-through decoration-primary/30 font-bold italic">₹{product.originalPrice}</p>
              </div>

              {/* Artisan Badges Section */}
              <div className="flex flex-wrap gap-4 pt-2">
                {artisanBadges.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-primary/5 shadow-sm">
                      <Icon className={cn("h-3.5 w-3.5", badge.color)} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/70">{badge.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-sm border border-primary/5 space-y-4">
              <h3 className="font-bold text-[11px] uppercase tracking-widest flex items-center text-foreground">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Artist's Story & Details
              </h3>
              <p className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                {product.description}. This unique piece is meticulously handcrafted using traditional techniques passed down through generations. Every stroke of paint and every mirror placement is done by hand, ensuring that you receive a one-of-a-kind masterpiece for your collection.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {specifications.map((spec, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{spec.label}</p>
                  <p className="text-sm font-bold text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 w-full">
              <div className="flex gap-3 w-full">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 lg:h-16 rounded-2xl text-[10px] font-bold uppercase tracking-widest border-primary text-primary hover:bg-primary/5 flex-1 shadow-sm" 
                  onClick={() => {addToCart(product); toast({title: "Added to bag", description: product.name});}}
                >
                  <ShoppingCart className="h-4 w-4 mr-1.5" />
                  Add to Bag
                </Button>
                <Button 
                  size="lg" 
                  className="h-14 lg:h-16 rounded-2xl text-[10px] font-bold uppercase tracking-widest gradient-primary flex-1 shadow-lg shadow-primary/20 group relative overflow-hidden transition-all hover:scale-[1.02] active:scale-95" 
                  onClick={() => {addToCart(product); window.location.href = '/cart';}}
                >
                  <Zap className="h-4 w-4 mr-1.5 group-hover:animate-bounce" />
                  Buy Now
                </Button>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-12 rounded-2xl border-green-100 bg-green-50/30 hover:bg-green-50 text-green-700 font-bold text-[11px] uppercase tracking-widest gap-2" 
                onClick={handleWhatsAppShare}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Inquire via WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {recommendedProducts.length > 0 && (
          <div className="space-y-10">
            <div className="text-center lg:text-left">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary mb-2">You May Also Like</h4>
              <h2 className="text-2xl lg:text-5xl font-black font-headline tracking-tight uppercase">Recommended Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10">
              {recommendedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
