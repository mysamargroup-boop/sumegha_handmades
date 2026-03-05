import { client } from './client';
import type { Product } from '@/lib/types';

// ==========================================
// PRODUCTS
// ==========================================

export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    "id": productId,
    name,
    description,
    "imageUrl": image.asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating,
    isFeatured
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    "id": productId,
    name,
    description,
    "imageUrl": image.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating
  }`;
  return client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export async function getProductById(productId: string): Promise<Product | null> {
  const query = `*[_type == "product" && productId == $productId][0] {
    "id": productId,
    name,
    description,
    "imageUrl": image.asset->url,
    "additionalImages": additionalImages[].asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating
  }`;
  return client.fetch(query, { productId }, { next: { revalidate: 60 } });
}

export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  const query = `*[_type == "product" && category->name == $categoryName] | order(_createdAt desc) {
    "id": productId,
    name,
    description,
    "imageUrl": image.asset->url,
    "category": category->name,
    subcategory,
    regular_price,
    sale_price,
    weight,
    dimensions,
    tags,
    rating
  }`;
  return client.fetch(query, { categoryName }, { next: { revalidate: 60 } });
}

// ==========================================
// CATEGORIES
// ==========================================

export interface SanityCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  subCategories: { name: string; imageUrl: string }[];
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  const query = `*[_type == "category"] | order(_createdAt asc) {
    "id": _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    "subCategories": subCategories[] {
      name,
      "imageUrl": image.asset->url
    }
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

// ==========================================
// BLOG POSTS
// ==========================================

export interface SanityBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[];
  coverImageUrl: string;
  author: string;
  category: string;
  publishedAt: string;
}

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    publishedAt
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    publishedAt
  }`;
  return client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export async function getBlogPostById(id: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "blogPost" && _id == $id][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImageUrl": coverImage.asset->url,
    author,
    category,
    publishedAt
  }`;
  return client.fetch(query, { id }, { next: { revalidate: 60 } });
}

// ==========================================
// TESTIMONIALS
// ==========================================

export interface SanityTestimonial {
  name: string;
  role: string;
  content: string;
  stars: number;
  avatarUrl?: string;
}

export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  const query = `*[_type == "testimonial"] | order(_createdAt asc) {
    name,
    role,
    content,
    stars,
    "avatarUrl": avatar.asset->url
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

// ==========================================
// SITE SETTINGS
// ==========================================

export interface SanityHeroSlide {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
}

export interface SanitySpotlightImage {
  imageUrl: string;
  title: string;
}

export interface SanitySiteSettings {
  siteName: string;
  siteDescription: string;
  heroSlides: SanityHeroSlide[];
  spotlightImages: SanitySpotlightImage[];
  instagramPosts: string[];
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string;
  email: string;
  aboutStory: string;
  aboutQuote: string;
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    "heroSlides": heroSlides[] {
      badge,
      title,
      highlight,
      description,
      "imageUrl": image.asset->url,
      linkUrl,
      buttonText
    },
    "spotlightImages": spotlightImages[] {
      "imageUrl": image.asset->url,
      title
    },
    "instagramPosts": instagramPosts[].asset->url,
    instagramHandle,
    instagramUrl,
    whatsappNumber,
    email,
    aboutStory,
    aboutQuote
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

// ==========================================
// GROUPED PRODUCTS (for homepage)
// ==========================================

export async function getProductsGroupedByCategory(): Promise<Record<string, Product[]>> {
  const products = await getAllProducts();
  return products.reduce((acc: Record<string, Product[]>, product) => {
    const cat = product.category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});
}
