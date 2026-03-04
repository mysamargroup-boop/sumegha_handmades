
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-black font-headline text-gradient">SUMEGHA</Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Curating beauty, one handmade piece at a time. We celebrate the spirit of craftsmanship and the elegance of traditional arts.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
              <Facebook className="h-5 w-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
              <Twitter className="h-5 w-5 text-primary cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/discovery" className="hover:text-primary transition-colors">AI Discovery</Link></li>
              <li><Link href="/wishlist" className="hover:text-primary transition-colors">Your Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 text-lg">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products?category=Ceramics" className="hover:text-primary transition-colors">Ceramics</Link></li>
              <li><Link href="/products?category=Paintings" className="hover:text-primary transition-colors">Paintings</Link></li>
              <li><Link href="/products?category=Jewelry" className="hover:text-primary transition-colors">Jewelry</Link></li>
              <li><Link href="/products?category=Decor" className="hover:text-primary transition-colors">Home Decor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@sumegha.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-wrap">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Crafts Colony, Art Street, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sumegha Handmades. Designed with Passion.</p>
        </div>
      </div>
    </footer>
  );
}
