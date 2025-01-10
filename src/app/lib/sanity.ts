import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Create the Sanity client
export const client = createClient({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: '2t4v4kxf',
    useCdn: false,
});

// Create image URL builder
const builder = imageUrlBuilder(client);

// Fix: Use `unknown` type instead of `any` for type safety
export function urlFor(source: unknown) {
    if (typeof source === 'object' && source !== null) {
        return builder.image(source);  // This is safe now!
    } else {
        throw new Error('Invalid source type');
    }
}
