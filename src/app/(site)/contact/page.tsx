
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Headphones, MessageCircle, Instagram, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function ContactPage() {
  const faqs = [
    {
      question: "Do you take custom orders for Lippan art?",
      answer: "Yes, we specialize in bespoke Lippan art and personalized mural pieces. You can customize the color palette, size, and mirror patterns to match your home's aesthetic."
    },
    {
      question: "How long does shipping take for handcrafted items?",
      answer: "Since each piece is created by hand with meticulous care, please allow 7-10 business days for preparation. International shipping may take 15-20 days."
    },
    {
      question: "Can I see the progress of my custom order?",
      answer: "Absolutely! For major custom commissions like name plates or large murals, we share progress shots on WhatsApp so you can witness your art coming to life."
    },
    {
      question: "Is international delivery available?",
      answer: "Yes, we ship our handmade treasures worldwide. Shipping costs and delivery times vary based on the destination. Contact us for a specific quote."
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-6">
        <div className="flex items-center justify-between max-w-lg mx-auto w-full">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-display font-black tracking-tight text-foreground uppercase">Contact Us</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-12 space-y-12 flex flex-col items-center">
        <div className="relative group">
          <div className="w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center relative z-10">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
            <div className="bg-white shadow-xl rounded-full p-6">
              <Headphones className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-display font-black text-foreground">Get in Touch</h2>
          <p className="text-foreground/60 text-base leading-relaxed max-w-sm">
            Reach out for custom Lippan art, personalized name plates, and traditional handmade decor.
          </p>
        </div>

        <div className="w-full space-y-8">
          <h3 className="text-center text-xs font-bold text-primary uppercase tracking-[0.3em]">Quick Connect</h3>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-16 w-16 rounded-full border-primary/10 hover:border-primary hover:bg-primary/5 shadow-sm transition-all"
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              >
                <WhatsAppIcon className="h-7 w-7 text-foreground" />
              </Button>
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-16 w-16 rounded-full border-primary/10 hover:border-primary hover:bg-primary/5 shadow-sm transition-all"
                onClick={() => window.open('https://instagram.com/sumegha_handmades', '_blank')}
              >
                <Instagram className="h-7 w-7 text-foreground" />
              </Button>
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-16 w-16 rounded-full border-primary/10 hover:border-primary hover:bg-primary/5 shadow-sm transition-all"
                onClick={() => window.open('mailto:hello@sumegha.com', '_blank')}
              >
                <Mail className="h-7 w-7 text-foreground" />
              </Button>
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Email</span>
            </div>
          </div>
        </div>

        <div className="w-full space-y-8 pt-8">
          <h3 className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Handmade Art FAQs</h3>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-none bg-white/50 backdrop-blur-sm rounded-3xl px-6 py-2 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-left font-display font-bold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="w-full pt-8">
          <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 border-white">
            <Image 
              src="https://picsum.photos/seed/studio-map-loc/800/400" 
              alt="Studio Map" 
              fill 
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6 text-center">
              <div className="bg-white p-3 rounded-full shadow-lg">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-white font-display font-black text-xl drop-shadow-md uppercase tracking-tight">Visit Our Studio</p>
                <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest max-w-[240px] drop-shadow-sm">
                  Makronia, Sagar Madhya Pradesh 470002
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
