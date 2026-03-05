
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductGrid />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container-normal mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex flex-col gap-8 w-full max-w-3xl">
            <Skeleton className="h-14 w-full rounded-2xl" />
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4 p-2 bg-white rounded-xl shadow-sm">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
