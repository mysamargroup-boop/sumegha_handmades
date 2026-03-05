import { MetadataRoute } from 'next';
import { getAllProducts, getAllCategories, getAllBlogPosts } from '@/sanity/lib/queries';
import productsData from "@/lib/products.json";
import categoriesData from "@/lib/categories.json";
import { Product } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sumeghahandmades.com';

    // Fetch Sanity Data
    let products = await getAllProducts().catch(() => null);
    let categories = await getAllCategories().catch(() => null);
    let blogPosts = await getAllBlogPosts().catch(() => null);

    // Fallback to local data if Sanity is empty/fails
    if (!products || products.length === 0) products = productsData.products as Product[];
    if (!categories || categories.length === 0) categories = categoriesData.categories as any[];
    if (!blogPosts) blogPosts = [];

    const productUrls = products.map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categoryUrls = categories.map((cat) => ({
        url: `${baseUrl}/products?category=${encodeURIComponent(cat.name)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const blogUrls = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const routes = ['', '/about', '/products', '/blog', '/contact', '/discovery'].map(
        (route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: route === '' ? 1 : 0.9,
        })
    );

    return [...routes, ...productUrls, ...categoryUrls, ...blogUrls];
}
