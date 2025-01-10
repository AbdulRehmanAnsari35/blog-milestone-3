// src/app/lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { Image } from '@sanity/types'; // You may need to install @sanity/types if not already installed

// Initialize Sanity client
export const client = createClient({
  apiVersion: '2023-05-03',
  dataset: 'production',
  projectId: '2t4v4kxf',
  useCdn: false,
});

// Image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs from Sanity asset
export function urlFor(source: Image) {
  return builder.image(source);
}
