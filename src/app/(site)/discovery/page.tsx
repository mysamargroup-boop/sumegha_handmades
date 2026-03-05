"use client";

import { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/ProductCard';
import { aiProductDiscoveryAssistant, ProductDiscoveryOutput } from '@/ai/flows/ai-product-discovery-assistant-flow';

export default function DiscoveryPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductDiscoveryOutput | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await aiProductDiscoveryAssistant({ userQuery: query });
      setResult(data);
    } catch (error) {
      console.error("Discovery error:", error);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "A gift for someone who loves pottery and nature",
    "Bohemian wall art for a bright living room",
    "Unique jewelry with traditional touch",
    "Handmade decor for a cozy study room"
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Sumegha AI</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black font-display">AI Art Concierge</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Describe what you're looking for, the occasion, or the vibe you want to achieve, and let our AI curate the perfect handmade selection for you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-4">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'A unique gift for my sister who loves earthy tones and ceramics'..."
            className="h-16 px-6 rounded-3xl text-lg shadow-xl border-primary/20 focus:ring-primary"
            disabled={loading}
          />
          <Button 
            type="submit" 
            className="h-16 px-10 rounded-3xl gradient-primary shadow-xl shadow-primary/20 text-lg font-bold"
            disabled={loading || !query.trim()}
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
            <span className="ml-2 hidden sm:inline">Discover</span>
          </Button>
        </form>
        
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setQuery(s)}
              className="text-sm px-4 py-2 rounded-full border border-primary/10 hover:bg-primary/5 transition-colors text-muted-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="text-lg font-medium text-muted-foreground animate-pulse">Our AI is searching the gallery...</p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-primary/5">
            <h3 className="text-2xl font-display font-bold mb-4 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-primary" />
              Sumegha's Suggestion
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground italic">"{result.assistantResponse}"</p>
          </div>

          {result.suggestedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.suggestedProducts.map((p) => (
                <ProductCard 
                  key={p.productId} 
                  product={{
                    id: p.productId,
                    name: p.name,
                    description: p.description,
                    sale_price: p.sale_price,
                    regular_price: p.regular_price,
                    imageUrl: p.imageUrl,
                    category: p.categories[0] || 'Art'
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">I couldn't find exactly that, but try adjusting your description!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
