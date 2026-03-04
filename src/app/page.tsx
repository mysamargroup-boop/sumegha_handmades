
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Palette, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = PlaceHolderImages.map((img, i) => ({
    id: img.id,
    name: img.description.split(' ').slice(0, 3).join(' '),
    description: img.description,
    price: [249, 599, 1200, 450, 899, 1500][i],
    imageUrl: img.imageUrl,
    category: ['Ceramics', 'Paintings', 'Jewelry', 'Boho', 'Decor', 'Textile'][i]
  }));

  const categories = [
    { name: 'Ceramics', icon: Sparkles, color: 'bg-pink-100' },
    { name: 'Paintings', icon: Palette, color: 'bg-purple-100' },
    { name: 'Jewelry', icon: Sparkles, color: 'bg-rose-100' },
    { name: 'Home Decor', icon: Sparkles, color: 'bg-fuchsia-100' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-32 gradient-bg">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 border border-primary/20 text-primary text-sm font-bold animate-fade-in">
                <Sparkles className="h-4 w-4" />
                <span>100% Handcrafted with Love</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black font-headline leading-tight tracking-tight">
                Celebrate the <span className="text-gradient">Art of Handmade</span> Living
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover curated artisanal products that bring soulful stories and creative elegance to your home and lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/products">
                  <Button className="h-14 px-10 rounded-full text-lg gradient-primary shadow-xl hover:scale-105 transition-transform">
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/discovery">
                  <Button variant="outline" className="h-14 px-10 rounded-full text-lg border-primary text-primary hover:bg-primary/5">
                    Ask AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto animate-float">
                <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-20" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  <Image 
                    src="https://picsum.photos/seed/sumegha-hero/800/800" 
                    alt="Handmade Pottery" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black font-headline mb-4">Explore Categories</h2>
            <div className="w-24 h-1.5 gradient-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/products?category=${cat.name}`} className="group">
                <div className={`p-8 rounded-3xl ${cat.color} flex flex-col items-center justify-center space-y-4 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg`}>
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <cat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-headline font-bold text-xl">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black font-headline mb-2">Editor's Choice</h2>
              <p className="text-muted-foreground">Most loved items by our community</p>
            </div>
            <Link href="/products">
              <Button variant="link" className="text-primary font-bold text-lg group p-0">
                View All <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Quality Assured", desc: "Every item is hand-inspected for artistic perfection." },
              { icon: Truck, title: "Global Shipping", desc: "We deliver art safely to your doorstep worldwide." },
              { icon: Sparkles, title: "Custom Orders", desc: "Personalize your products through direct artist contact." }
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                  <feature.icon className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-xl mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Discovery CTA */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[3rem] gradient-primary p-12 lg:p-20 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <Sparkles className="w-full h-full" />
            </div>
            <div className="relative z-10 max-w-2xl text-white">
              <h2 className="text-4xl lg:text-6xl font-black font-headline mb-6">Can't decide what to pick?</h2>
              <p className="text-xl opacity-90 mb-10 leading-relaxed">
                Our AI Assistant "Sumegha AI" knows our collection inside out. Describe your taste, and it will find the perfect match for you.
              </p>
              <Link href="/discovery">
                <Button size="lg" variant="secondary" className="h-16 px-10 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                  Start AI Discovery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
