import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { TopBar } from '@/components/TopBar';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-display antialiased min-h-screen flex flex-col pb-16 md:pb-0 relative">
            {/* Global Background Overlays */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-pink-200/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-[20%] left-[5%] w-[25%] h-[25%] bg-amber-100/10 rounded-full blur-[60px]" />
            </div>

            <TopBar />
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
