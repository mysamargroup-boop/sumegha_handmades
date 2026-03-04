
"use client";

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
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

export function Footer() {
  const footerData = [
    {
      title: "Company",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "The Blog", href: "/blog" },
        { name: "The Craft", href: "#" },
      ]
    },
    {
      title: "Shop",
      links: [
        { name: "All Works", href: "/products" },
        { name: "AI Concierge", href: "/discovery" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Shipping Info", href: "#" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact", href: "#" },
        { name: "FAQ", href: "#" },
      ]
    }
  ];

  const contactItems = [
    { label: "EMAIL US", value: "hello@sumegha.com", icon: Mail },
    { label: "CALL US", value: "+91 98765 43210", icon: Phone },
    { label: "OUR STUDIO", value: "Makronia, Sagar Madhya Pradesh 470002", icon: MapPin },
  ];

  return (
    <footer className="bg-[#181113] text-white rounded-t-[3rem] lg:rounded-t-[4rem] pt-16 lg:pt-20 pb-12">
      <div className="container-normal px-8 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16 mb-16 lg:mb-20">
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 max-w-md w-full">
            <h3 className="text-lg lg:text-3xl font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-white">Join the Inner Circle</h3>
            <p className="text-white/40 text-[9px] lg:text-[10px] font-light tracking-[0.2em] leading-relaxed uppercase">
              Experience new collections, limited drops, and exclusive releases.
            </p>
            <div className="flex flex-col sm:flex-row w-full gap-3 mt-4">
              <Input 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 text-[10px] font-display tracking-widest uppercase h-12 lg:h-14 rounded-xl flex-grow px-6 border focus:ring-primary/50" 
                placeholder="Email Address"
                type="email"
              />
              <Button className="h-12 lg:h-14 px-10 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] gradient-primary transition-all text-white border-none shadow-none">
                Subscribe
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-10 w-full lg:w-auto">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 items-center">
              <Link href="#" className="text-white/40 hover:text-primary transition-all hover:scale-110">
                <Instagram className="h-6 w-6 lg:h-7 lg:w-7" />
              </Link>
              <Link href="#" className="text-white/40 hover:text-blue-500 transition-all hover:scale-110">
                <Facebook className="h-6 w-6 lg:h-7 lg:w-7" />
              </Link>
              <Link href="#" className="text-white/40 hover:text-sky-400 transition-all hover:scale-110">
                <Twitter className="h-6 w-6 lg:h-7 lg:w-7" />
              </Link>
              <Link href="#" className="text-white/40 hover:text-red-500 transition-all hover:scale-110">
                <Youtube className="h-6 w-6 lg:h-7 lg:w-7" />
              </Link>
              <Link href="#" className="text-white/40 hover:text-green-500 transition-all hover:scale-110">
                <WhatsAppIcon className="h-6 w-6 lg:h-7 lg:w-7" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-col items-start lg:items-end gap-10 w-full lg:w-auto px-4 lg:px-0">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-start lg:items-end gap-3 w-full group">
                    <div className="flex items-center gap-3 text-primary lg:justify-end w-full">
                      <Icon className="h-5 w-5 stroke-[2.5px]" />
                      <span className="text-[11px] lg:text-[12px] font-black uppercase tracking-[0.3em]">{item.label}</span>
                    </div>
                    <p className="text-white/80 text-sm lg:text-base font-light tracking-wide lg:text-right w-full">
                      {item.value}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        <div className="hidden md:grid md:grid-cols-4 gap-12 py-12 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 lg:pl-12">
          {footerData.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-white/30 text-[9px] tracking-[0.5em] mb-4">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-primary transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:hidden border-t border-white/5 py-2">
          <Accordion type="single" collapsible className="w-full">
            {footerData.map((section, idx) => (
              <AccordionItem key={section.title} value={`item-${idx}`} className="border-white/5">
                <AccordionTrigger className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:no-underline py-4 px-4">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 py-2 px-6">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-[9px] text-white/40 uppercase tracking-widest hover:text-primary transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 text-center px-4">
          <p className="text-[9px] text-white/10 uppercase tracking-[0.5em] font-medium leading-relaxed">
            © {new Date().getFullYear()} Sumegha Handmades. Crafted with Precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
