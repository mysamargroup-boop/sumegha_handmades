"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Sumegha Handmades, you agree to be bound by these Terms and Conditions. Our products are handcrafted, meaning slight variations in color, texture, and finish are part of the artistic process and not considered defects."
    },
    {
      title: "2. Custom Orders",
      content: "For custom name plates and bespoke art, production begins only after payment confirmation. Changes to custom designs are not possible once the crafting process has started. We will share progress updates via WhatsApp for major commissions."
    },
    {
      title: "3. Pricing and Payments",
      content: "All prices are in INR. We reserve the right to modify prices without prior notice. Payments are facilitated through secure channels, and for WhatsApp orders, payment proof must be shared to finalize the order."
    },
    {
      title: "4. Intellectual Property",
      content: "All designs, images, and content on this website are the intellectual property of Sumegha Handmades. Unauthorized reproduction or commercial use of our designs is strictly prohibited."
    }
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24 px-4">
      <div className="container-normal mx-auto max-w-4xl space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/">
            <Button variant="ghost" className="rounded-full mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
          <div className="p-4 bg-primary/10 rounded-full">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl lg:text-6xl font-black uppercase tracking-tight text-foreground">Terms & Conditions</h1>
          <p className="text-foreground/50 text-sm font-light uppercase tracking-widest">Last Updated: January 2026</p>
        </div>

        <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 lg:p-16 border border-primary/5 shadow-sm space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary flex items-center gap-3">
                <FileText className="h-5 w-5 opacity-50" />
                {section.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed font-light text-base lg:text-lg">
                {section.content}
              </p>
            </div>
          ))}
          
          <div className="pt-8 border-t border-primary/10 text-center">
            <p className="text-sm text-foreground/40 italic">
              If you have any questions regarding these terms, please contact us via the help section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
