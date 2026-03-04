"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import placeholderData from '@/lib/placeholder-images.json';

export default function BlogPage() {
  const blogPosts = [
    {
      id: "1",
      title: "The Soul of Handmade: Why It Matters",
      excerpt: "In a world of mass production, find out why handcrafted pieces carry a unique energy and story within them.",
      author: "Sumegha",
      date: "January 12, 2026",
      category: "Philosophy",
      imageId: "blog-1"
    },
    {
      id: "2",
      title: "Lippan Art: A Desert Masterpiece",
      excerpt: "Tracing the roots of Kutch's traditional mirror work and how we bring it into modern urban homes.",
      author: "Sumegha",
      date: "January 20, 2026",
      category: "Tradition",
      imageId: "blog-2"
    },
    {
      id: "3",
      title: "Designing for Serenity",
      excerpt: "How to curate your living space with minimal but impactful art to create a sanctuary of peace.",
      author: "Sumegha",
      date: "January 28, 2026",
      category: "Design",
      imageId: "blog-3"
    }
  ];

  const blogs = blogPosts.map(blog => {
    const imageData = placeholderData.placeholderImages.find(img => img.id === blog.imageId);
    return {
      ...blog,
      image: imageData ? imageData.imageUrl : ''
    };
  });

  const heroPattern = placeholderData.placeholderImages.find(img => img.id === 'hero-pattern');

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container-normal mx-auto space-y-20">
        <div className="text-center space-y-4 px-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">The Studio Journal</p>
          <h1 className="text-2xl lg:text-7xl font-black uppercase tracking-tight text-foreground">Stories & Insights</h1>
          <p className="text-foreground/50 text-sm lg:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A deeper look into the artistry, traditions, and philosophy behind every Sumegha creation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 pb-20">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-primary/5 block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 lg:p-10 space-y-6">
                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3" />
                    {blog.author}
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-foreground/60 text-sm leading-relaxed font-light line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-4 bg-[#181113] p-12 lg:p-20 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {heroPattern && <Image src={heroPattern.imageUrl} alt="pattern" fill className="object-cover" />}
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl lg:text-4xl font-black uppercase tracking-widest text-white">Never Miss a Story</h3>
            <p className="text-white/60 text-sm font-light max-w-lg mx-auto">Get notified about new articles, collection drops, and artist insights directly in your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
              <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl" placeholder="Email Address" />
              <Button className="h-14 px-10 gradient-primary text-[10px] font-bold uppercase tracking-widest">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
