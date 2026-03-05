import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: 'zhi2v4xf',
    dataset: 'production',
    apiVersion: '2024-01-01',
    // Set to false for production — data is fetched from CDN for speed
    useCdn: true,
});
