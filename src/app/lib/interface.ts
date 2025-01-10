// src/app/lib/interface.ts
export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: unknown; // Use 'unknown' temporarily
  }
  
  export interface fullBlog {
    currentSlug: string;
    title: string;
    content: string;
    titleImage: unknown; // Use 'unknown' temporarily
  }
  