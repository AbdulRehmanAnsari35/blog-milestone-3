import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface"; 
import { client, urlFor } from "./lib/sanity"; 
import Image from "next/image"; 
import Link from "next/link";

// Fetching blog data from Sanity
async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

// Home component to display blog posts
export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      {data.map((post, idx) => (
        <Card key={idx} className="shadow-lg rounded-lg overflow-hidden">
          {/* Image rendering with fill property */}
          <div className="relative h-60"> {/* Ensure this div has relative positioning */}
            {/* Check if titleImage exists and is a valid image */}
            {post.titleImage ? (
              <Image
                src={urlFor(post.titleImage).url()} // Use `urlFor` to get the image URL
                alt={post.title || "Blog image"} // Fallback alt text
                fill={true} // `fill` for Next.js 15
                style={{ objectFit: "cover" }} // Apply objectFit style for better scaling
                className="rounded-t-lg" // Apply rounded top corners
              />
            ) : (
              <div className="bg-gray-300 h-full flex items-center justify-center rounded-t-lg">
                {/* Fallback for missing or invalid image */}
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
          </div>

          {/* Card content including title and description */}
          <CardContent className="mt-5">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-3 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Link href={`/blog/${post.currentSlug}`}>
              <button className="w-full mt-7 bg-blue-600 dark:bg-blue-800 font-medium py-2 rounded-md">
                Read More
              </button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
