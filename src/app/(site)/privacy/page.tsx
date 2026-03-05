"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: "We collect information you provide directly to us when you place an order, subscribe to our newsletter, or communicate with us via WhatsApp. This may include your name, email address, phone number, shipping address, and order details."
    },
    {
      title: "2. How We Use Your Information",
      icon: Eye,
      content: "We use your information to process and fulfill your orders, provide customer support, and send you updates about our collections (only if you've opted in). Your WhatsApp number is primarily used to share progress photos of your custom art and coordinate delivery."
    },
    {
      title: "3. WhatsApp Communication",
      icon: Lock,
      content: "Communications on WhatsApp are subject to WhatsApp's own privacy policy. Sumegha Handmades ensures that your personal chat history and order details shared there are treated with the utmost confidentiality and are never shared with third parties for marketing purposes."
    },
    {
      title: "4. Data Security",
      icon: ShieldCheck,
      content: "We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
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
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl lg:text-6xl font-black uppercase tracking-tight text-foreground">Privacy Policy</h1>
          <p className="text-foreground/50 text-sm font-light uppercase tracking-widest">Effective Date: January 2026</p>
        </div>

        <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 lg:p-16 border border-primary/5 shadow-sm space-y-12">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight text-primary flex items-center gap-3">
                  <Icon className="h-5 w-5 opacity-50" />
                  {section.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed font-light text-base lg:text-lg">
                  {section.content}
                </p>
              </div>
            );
          })}
          
          <div className="pt-8 border-t border-primary/10 text-center">
            <p className="text-sm text-foreground/40 italic">
              Your trust is our most valued masterpiece. If you have questions about how we handle your data, please reach out to us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
